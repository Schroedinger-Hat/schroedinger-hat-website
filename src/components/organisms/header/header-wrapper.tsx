import { Header } from "@/components/organisms/header/header"
import { sanityClient } from "@/sanity/lib/client"
import { eventCodesQuery } from "@/sanity/queries"

async function getEventCodes() {
  return await sanityClient.fetch(eventCodesQuery)
}

export async function HeaderWrapper() {
  const eventCodes = await getEventCodes()
  return <Header eventCodes={eventCodes} />
}
