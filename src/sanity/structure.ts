import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      // Minimum required configuration
      orderableDocumentListDeskItem({ type: "partner", S, context }),
      ...S.documentTypeListItems(),
    ]);
