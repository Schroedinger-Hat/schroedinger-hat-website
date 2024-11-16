import { type SchemaTypeDefinition } from "sanity";
import { eventType } from "./eventType";
import { partnerType } from "./partnerType";
import { pageType } from "./pageType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, partnerType, pageType],
};
