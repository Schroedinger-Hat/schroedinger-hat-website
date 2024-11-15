import { type SchemaTypeDefinition } from "sanity";
import { eventType } from "./eventType";
import { partnerType } from "./partnerType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, partnerType],
};
