import { defineType } from "sanity";

interface AuthorDocument {
  name: string;
  surname: string;
}

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    {
      name: "firstName",
      title: "First Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "lastName",
      title: "Last Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "pronouns",
      title: "Pronouns",
      type: "string",
      description: "e.g., they/them, she/her, he/him",
    },
    {
      name: "photo",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "biography",
      title: "Biography",
      type: "text",
      rows: 4,
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc: AuthorDocument) => {
          if (!doc?.firstName || !doc?.lastName) return "";
          return `${doc.firstName}-${doc.lastName}`;
        },
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      firstName: "firstName",
      lastName: "lastName",
      pronouns: "pronouns",
    },
    prepare: (selection: {
      firstName: string;
      lastName: string;
      pronouns: string;
    }) => ({
      title: `${selection.firstName} ${selection.lastName}${selection.pronouns ? ` (${selection.pronouns})` : ""}`,
      subtitle: "",
    }),
  },
});
