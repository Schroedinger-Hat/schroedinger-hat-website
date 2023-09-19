export function getAssetURL(asset: string) {
  return new URL(`../assets/${asset}`, import.meta.url).href
}
