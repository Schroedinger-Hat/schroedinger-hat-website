import { defineType } from "sanity"

export const eventCodeType = defineType({
  name: "eventCode",
  title: "Event Code",
  type: "document",
  fields: [
    {
      name: "eventName",
      title: "Event Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "eventCode",
      title: "Discount Code",
      type: "string",
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
      title: "eventName",
      subtitle: "partner",
      validThru: "validThru",
    },
    prepare({ title, validThru }: { title: string; subtitle: string; validThru: string }) {
      const isValid = validThru ? new Date(validThru) >= new Date() : false
      return {
        title: `${title} ${isValid ? "✅" : "❌"}`,
        subtitle: `${isValid ? "Active" : "Expired"}`,
      }
    },
  },
})
