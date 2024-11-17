import { defineType, ConditionalPropertyCallback, Image } from "sanity";

interface PreviewSelection {
  title: string;
  subtitle: boolean;
  businessTier: string;
  nonBusinessType: string;
  media: Image;
}

export const partnerType = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "isBusinessPartner",
      title: "Is Business Partner",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "businessTier",
      title: "Business Partnership Tier",
      type: "string",
      options: {
        list: [
          { title: "Silver", value: "silver" },
          { title: "Gold", value: "gold" },
          { title: "Platinum", value: "platinum" },
          { title: "Diamond", value: "diamond" },
        ],
      },
      hidden: (({ document }) =>
        !document?.isBusinessPartner) as ConditionalPropertyCallback,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.isBusinessPartner && !value) {
            return "Business partners must have a tier selected";
          }
          return true;
        }),
    },
    {
      name: "nonBusinessType",
      title: "Non-Business Partner Type",
      type: "string",
      initialValue: "community",
      options: {
        list: [
          { title: "Community", value: "community" },
          { title: "Media", value: "media" },
        ],
      },
      hidden: (({ document }) =>
        document?.isBusinessPartner) as ConditionalPropertyCallback,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!context.document?.isBusinessPartner && !value) {
            return "Non-business partners must have a type selected";
          }
          return true;
        }),
    },
    {
      name: "website",
      title: "Website URL",
      type: "url",
      description: "Partner's website URL",
    },
    {
      name: "partnershipPeriod",
      title: "Partnership Period",
      type: "object",
      fields: [
        {
          name: "startDate",
          title: "Start Date",
          type: "date",
        },
        {
          name: "endDate",
          title: "End Date",
          type: "date",
        },
      ],
    },
    {
      name: "contact",
      title: "Contact Information",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Name",
          type: "string",
        },
        {
          name: "email",
          title: "Email",
          type: "string",
          validation: (Rule) =>
            Rule.email().error("Please enter a valid email address"),
        },
      ],
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Used to control the display order of partners",
    },
  ],
  initialValue: {
    isBusinessPartner: false,
    nonBusinessType: "community",
  },
  preview: {
    select: {
      title: "name",
      subtitle: "isBusinessPartner",
      businessTier: "businessTier",
      nonBusinessType: "nonBusinessType",
      media: "image",
    },
    prepare: (selection: PreviewSelection) => {
      const { title, subtitle, businessTier, nonBusinessType, media } =
        selection;
      const partnerType = subtitle
        ? `Business - ${businessTier}`
        : `Non-Business - ${nonBusinessType}`;
      return {
        title,
        subtitle: partnerType,
        media,
      } as const;
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Partner Name",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});
