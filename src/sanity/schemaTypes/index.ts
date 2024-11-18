import { type SchemaTypeDefinition } from "sanity";
import { eventType } from "./eventType";
import { partnerType } from "./partnerType";
import { pageType } from "./pageType";
import { videoType } from "./videoType";
import { authorType } from "./authorType";

export const schema = {
  types: [
    eventType,
    partnerType,
    pageType,
    videoType,
    authorType,
  ] as SchemaTypeDefinition[],
};