type ImageCaptureData = {
  name: string;
  dataUrl: string;
  source: string;
  tags: string[];
  timestamp: number;
};

type ImageMetadata = {
  name: string;
  imageUrl: string;
  source: string;
  tags: string[];
  timestamp: number;
};

type SiteDocument = {
  images: ImageMetadata[];
};
