import { defineQuery } from "next-sanity"

const eventCodesQuery = defineQuery(`
  *[_type == "eventCode"] {
    _id,
    eventName,
    eventCode,
    partner->{name},
    validFrom,
    validThru,
    "isValid": validThru >= now()
  }
`)

export { eventCodesQuery }
