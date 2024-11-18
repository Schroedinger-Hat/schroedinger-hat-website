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
      type: "object",
      fields: [
        {
          name: "name",
          title: "Location Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "address",
          title: "Address",
          type: "string",
        },
        {
          name: "coordinates",
          title: "Coordinates",
          type: "geopoint",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "eventPeriod",
      title: "Event Period",
      type: "object",
      fields: [
        {
          name: "startDate",
          title: "Start Date",
          type: "datetime",
        },
        {
          name: "endDate",
          title: "End Date",
          type: "datetime",
        },
      ],
    },
    {
      name: "cta",
      title: "Call to Action",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Text",
          type: "string",
        },
        {
          name: "url",
          title: "URL",
          type: "url",
        },
      ],
    },
  ],
});
