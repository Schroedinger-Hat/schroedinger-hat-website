import { defineQuery } from "next-sanity"

const eventCodesQuery = defineQuery(`
  *[_type == "eventCode" && validThru >= now()] {
    _id,
    eventName,
    eventCode,
    partner->{name},
    validFrom,
    validThru,
  }
`)

export { eventCodesQuery }
