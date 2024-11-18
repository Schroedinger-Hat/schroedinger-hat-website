import { defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
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
      type: "array",
      title: "Abstract",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "cover",
      title: "Cover",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "endDate",
      title: "End Date",
      type: "datetime",
    },
  ],
});
