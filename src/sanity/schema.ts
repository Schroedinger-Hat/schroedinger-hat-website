import { seriesType } from "./schemaTypes/eventSeriesType";

// Add seriesType to your schema types array
export const schema = {
  types: [
    // ... other types
    seriesType,
    // ... other types
  ],
};
