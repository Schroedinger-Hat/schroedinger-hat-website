import { defineType } from "sanity";

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      validation: (Rule) =>
        Rule.max(160).warning(
          "SEO descriptions should be under 160 characters",
        ),
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "headerImage",
      title: "Header Image",
      type: "image",
      description: "Main image displayed at the top of the page",
      options: {
        hotspot: true,
      },
    },
    {
      name: "socialTitle",
      title: "Social Media Title",
      type: "string",
      description:
        "Title to be used for social media sharing (if different from main title)",
    },
    {
      name: "socialDescription",
      title: "Social Media Description",
      type: "text",
      description:
        "Description to be used for social media sharing (if different from SEO description)",
    },
  ],
});
