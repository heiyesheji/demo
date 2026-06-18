"use client";

import { useState } from "react";
import Image from "next/image";
import ImageViewer from "./ImageViewer";
import { ImageItem } from "@/data/modules";

interface ThumbnailGridProps {
  images: ImageItem[];
}

export default function ThumbnailGrid({ images }: ThumbnailGridProps) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 p-4">
        {images.map((img, index) => (
          <button
            key={img.id}
            onClick={() => setViewerIndex(index)}
            className="relative rounded-xl overflow-hidden bg-gray-100 active:scale-95 transition-transform duration-150 text-left"
          >
            <div className="relative aspect-[9/16] w-full">
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover"
                sizes="50vw"
                unoptimized
              />
            </div>
            <div className="px-2 py-1.5">
              <p className="text-xs text-gray-600 truncate">{img.title}</p>
            </div>
          </button>
        ))}
      </div>

      {viewerIndex !== null && (
        <ImageViewer
          images={images}
          initialIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </>
  );
}
