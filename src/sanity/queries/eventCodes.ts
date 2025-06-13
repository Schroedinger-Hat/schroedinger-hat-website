import { defineQuery } from "next-sanity"

const eventCodesQuery = defineQuery(`
  *[_type == "eventCode" && validThru >= now()] {
    _id,
    name,
    description,
    code,
    partner->{name},
    validFrom,
    validThru,
  }
`)

export { eventCodesQuery }
