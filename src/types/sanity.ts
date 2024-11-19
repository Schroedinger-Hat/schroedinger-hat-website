export interface SanityImageType {
  url: string;
  backgroundColor?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  // Add other relevant image properties as needed
}
