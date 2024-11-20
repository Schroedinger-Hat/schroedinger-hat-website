import { defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
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
      name: "abstract",
      title: "Abstract",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "repositoryUrl",
      title: "Repository URL",
      type: "url",
      description: "GitHub repository URL",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["https"],
        }).custom((url: string) => {
          if (!url) return true;
          return url.startsWith("https://github.com/")
            ? true
            : "Must be a GitHub URL";
        }),
    },
    {
      name: "showStars",
      title: "Show Stars",
      type: "boolean",
      description: "Show the GitHub stars badge",
    },
    {
      name: "technologies",
      title: "Technologies",
      type: "array",
      description: "List of technologies used in the project",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls the display order (lower numbers appear first)",
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: "",
        media,
      };
    },
  },
});
