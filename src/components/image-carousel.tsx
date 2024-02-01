import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ImageCarousel({ data }: { data: ImageMetadata[] }) {
  return (
    <Carousel className="w-full max-w-lg ml-8">
      <CarouselContent>
        {data.map((imageData, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <img
                src={imageData.imageUrl}
                className="w-full h-64 object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
