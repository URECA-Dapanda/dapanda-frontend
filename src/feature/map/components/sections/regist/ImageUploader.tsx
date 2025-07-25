"use client";

import { Camera } from "lucide-react";

interface Props {
  images: string[]; // base64 preview용
}

export default function ImageUploader({ images }: Props) {
  return (
    <div className="flex gap-12 mb-24">
      <div className="w-80 h-80 border border-dashed border-primary rounded-20 flex items-center justify-center text-pink-500 text-2xl">
        <Camera className="w-32 h-32" />
      </div>
      {images.map((src, i) => (
        <div
          key={i}
          className="w-80 h-80 bg-primary-50 rounded-20"
          style={{ backgroundImage: `url(${src})`, backgroundSize: "cover" }}
        />
      ))}
    </div>
  );
}
