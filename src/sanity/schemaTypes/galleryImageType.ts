import { defineType } from "sanity";

export const galleryImageType = defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Events", value: "events" },
          { title: "Community", value: "community" },
          { title: "Projects", value: "projects" },
          { title: "Other", value: "other" },
        ],
      },
    },
    {
      name: "takenAt",
      title: "Date Taken",
      type: "datetime",
    },
    {
      name: "photographer",
      title: "Photographer",
      type: "reference",
      to: [{ type: "author" }],
    },
    {
      name: "featured",
      title: "Featured Image",
      type: "boolean",
      description: "Display this image prominently in the gallery",
      initialValue: false,
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
      media: "image",
      category: "category",
    },
    prepare({ title, media, category }) {
      return {
        title,
        subtitle: category ? `Category: ${category}` : "No category",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Date Taken",
      name: "dateTakenDesc",
      by: [{ field: "takenAt", direction: "desc" }],
    },
  ],
});
