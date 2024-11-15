import { defineType } from "sanity";

export const pageContentType = defineType({
  name: "pageContent",
  title: "Page Content",
  type: "document",
  fields: [
    {
      name: "pageName",
      title: "Page Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "key",
      title: "Content Key",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "value",
      title: "Content Value",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
  ],
});
