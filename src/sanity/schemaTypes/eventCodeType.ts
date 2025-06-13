import { defineType } from "sanity"

export const eventCodeType = defineType({
  name: "eventCode",
  title: "Event Code",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Event Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "code",
      title: "Discount Code",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description of the benefit",
      description: "Example: 20% Discount, 1 Ticket Free, etc.",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "url",
      title: "Event URL",
      type: "string",
    },
    {
      name: "date",
      title: "Date of event",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "partner",
      title: "Partner",
      type: "reference",
      to: [{ type: "partner" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "validFrom",
      title: "Valid From",
      type: "date",
      validation: (Rule) => Rule.required().min(new Date().toISOString().substring(0, 10)),
    },
    {
      name: "validThru",
      title: "Valid Thru",
      type: "date",
      validation: (Rule) => Rule.required().min(Rule.valueOfField("validFrom")),
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "partner",
      validThru: "validThru",
    },
    prepare(selection) {
      const { title, validThru } = selection
      const isValid = validThru ? new Date(validThru) >= new Date() : false
      return {
        title: `${title} ${isValid ? "✅" : "❌"}`,
        subtitle: `${isValid ? "Active" : "Expired"}`,
      }
    },
  },
})
