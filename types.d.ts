type ImageCaptureData = {
  dataUrl: string;
  source: string;
  tags: string[];
  timestamp: number;
};

type ImageMetadata = {
  imageUrl: string;
  source: string;
  siteId: string;
  tags: string[];
  timestamp: number;
};

type SiteDocument = {
  images: ImageMetadata[];
};
