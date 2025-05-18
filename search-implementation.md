# Implementing Global Search with Sanity and Algolia

This document outlines how to set up a global search feature powered by Algolia on a Sanity-based Next.js website. The search is triggered by pressing Cmd+K (or Ctrl+K on Windows).

## Components Created

1. **UI Components**:
   - `src/components/ui/command.tsx` - Command menu component using CMDK
   - `src/components/molecules/search-command.tsx` - Search component with keyboard shortcut listener
   - `src/components/organisms/global-search.tsx` - Wrapper for the search component
   - Added the search component to the header

2. **Backend Integration**:
   - `src/lib/search-service.ts` - Service to interact with Algolia from the client side
   - `src/app/api/algolia/route.ts` - Webhook handler for Sanity to sync content with Algolia
   - `src/lib/hooks/use-debounce.ts` - Utility hook for debouncing search queries

## Setup Steps

### 1. Environment Variables

Add the following environment variables to your `.env` file:

```
# Algolia credentials
ALGOLIA_APP_ID="your-algolia-app-id"
ALGOLIA_SEARCH_API_KEY="your-algolia-search-api-key"
ALGOLIA_INDEX_NAME="schroedinger-hat-content"
ALGOLIA_ADMIN_API_KEY="your-algolia-admin-api-key"
```

### 2. Algolia Account Setup

1. Create an account on [Algolia](https://www.algolia.com/)
2. Create a new application
3. Create a new index named `schroedinger-hat-content` (or whatever you set in your environment variables)
4. Note your App ID, Search API Key, and Admin API Key for the environment variables

### 3. Sanity Webhook Setup

1. In your Sanity dashboard, go to API > Webhooks
2. Create a new webhook with the following settings:
   - **URL**: `https://yourdomain.com/api/algolia` (your deployed API route)
   - **HTTP Method**: POST
   - **Trigger on**: Create, Update, Delete
   - **Filter**: 
   ```
   _type == 'post'
   ```
   - **Projection**:
   ```
   {
     "transactionId": _rev,
     "projectId": sanity::projectId(),
     "dataset": sanity::dataset(),
     "_id": _id,
     // Returns a string value of "create", "update" or "delete" according to which operation was executed
     "operation": delta::operation(),
     // Define the payload
     "value": {
       "objectID": _id,
       "title": title,
       "slug": slug.current,
       // Portable text
       "body": pt::text(content),
       "_type": _type,
       "coverImage": coverImage.asset->url,
       "date": date,
       "_createdAt": _createdAt,
       "_updatedAt": _updatedAt
     }
   }
   ```

### 4. Initial Indexing

To perform an initial indexing of your content:

```bash
curl -X POST "https://yourdomain.com/api/algolia?initialIndex=true"
```

This will fetch all published documents from Sanity and index them in Algolia.

## How It Works

1. **Content Indexing**:
   - When content is published, updated, or deleted in Sanity, a webhook is triggered
   - The webhook calls our API route with details about the operation
   - The API route updates the Algolia index accordingly

2. **Search Functionality**:
   - The search command is triggered by pressing Cmd+K (or Ctrl+K)
   - As the user types, we debounce the input and send a search request to Algolia
   - Search results are displayed in a dropdown menu
   - Clicking a result navigates to the corresponding page

## Customization

- Modify the projection in the Sanity webhook to include additional fields you want to make searchable
- Adjust the `SearchResult` type in `search-service.ts` to match your content model
- Update the UI of the search results in the `SearchCommand` component
- Customize the search logic in the `search` method of the `SearchService` class

## References

- [Algolia Documentation](https://www.algolia.com/doc/)
- [Sanity Webhooks](https://www.sanity.io/docs/webhooks)
- [CMDK](https://cmdk.paco.me/)
- [Sanity Algolia integration](https://github.com/sanity-io/sanity-algolia) 