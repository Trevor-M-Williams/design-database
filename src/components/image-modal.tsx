"use client";
import { useState } from "react";
import Link from "next/link";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ArrowIcon from "@mui/icons-material/ArrowOutwardRounded";

export default function ImageModal({ data }: { data: ImageMetadata }) {
  const [isOpen, setIsOpen] = useState(false);
  const { name, imageUrl, source, tags } = data;

  return (
    <div className="relative">
      <div className="group h-64 bg-secondary flex justify-center shadow-lg rounded overflow-hidden">
        <img
          src={imageUrl}
          alt="Image"
          className="w-full max-h-full object-cover"
        />
        <EyeIcon
          className="absolute top-1 left-1 px-1 rounded text-white bg-black/50 cursor-pointer opacity-0 group-hover:opacity-100"
          onClick={() => setIsOpen(true)}
        />
        <Link href={source || ""} target="_blank">
          <ArrowIcon className="absolute top-1 right-1 px-1 rounded text-white bg-black/50 cursor-pointer opacity-0 group-hover:opacity-100" />
        </Link>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <img src={imageUrl} alt="Image" className="max-h-4/5 max-w-[90%]" />
        </div>
      )}
    </div>
  );
}
