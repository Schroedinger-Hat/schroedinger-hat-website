import { defineQuery } from "next-sanity"

const eventCodesQuery = defineQuery(`
  *[_type == "eventCode" && validThru >= now()] {
    _id,
    name,
    description,
    url,
    date,
    code,
    partner->{
      name
    },
    validFrom,
    validThru,
  }
`)

export { eventCodesQuery }
