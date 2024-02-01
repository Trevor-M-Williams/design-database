"use client";
import { useState } from "react";
import ImageModal from "@/components/image-modal";
import ImageGridNav from "./image-grid-nav";

export default function ImageGrid({ data }: { data: ImageMetadata[] }) {
  const [filteredData, setFilteredData] = useState(data);

  return (
    <div className="relative w-full max-w-screen-2xl mx-auto p-8">
      <div className="flex items-center gap-8 mb-4">
        <h1 className="text-3xl font-bold">Gallery</h1>
        <ImageGridNav data={data} setFilteredData={setFilteredData} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((imageData, i) => (
          <ImageModal key={i} data={imageData} />
        ))}
      </div>
    </div>
  );
}
