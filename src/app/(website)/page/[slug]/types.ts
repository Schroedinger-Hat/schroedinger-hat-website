import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { PortableTextBlock } from "@portabletext/types";

export interface PageData {
  title: string;
  headerImage?: {
    asset: SanityImageSource;
    url?: string;
  };
  content: PortableTextBlock[];
  slug: {
    current: string;
  };
}
