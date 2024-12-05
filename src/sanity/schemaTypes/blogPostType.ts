import { defineType } from "sanity";

export const blogPostType = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "authors",
      title: "Authors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "author" }],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "A short summary of the blog post",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "headerImage",
      title: "Header Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "content",
      type: "array",
      title: "Content",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              description: "Important for SEO and accessibility.",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Optional caption for the image",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      author0: "authors.0.firstName",
      author1: "authors.1.firstName",
      media: "headerImage",
    },
    prepare: ({ title, author0, author1, media }) => {
      const authors = [author0, author1].filter(Boolean);
      const subtitle =
        authors.length > 0
          ? `by ${authors.join(" & ")}${authors.length > 2 ? " & others" : ""}`
          : "";

      return {
        title,
        subtitle,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Publication Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
