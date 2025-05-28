/**
 * Extracts the element type from an array type.
 * @example ArrayElement<string[]> returns string
 */
export type ArrayElement<T> = T extends (infer U)[] ? U : never
