"use client";

import { Camera } from "lucide-react";
import { ChangeEvent, useRef } from "react";

interface Props {
  images: string[]; // S3 업로드된 URL
  previews: string[]; // base64 preview
  onChange: (files: File[]) => void;
}

export default function ImageUploader({ images, previews, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    onChange(Array.from(files));
  };

  return (
    <div className="flex gap-12 mb-24">
      {/* 업로드 버튼 */}
      <div
        className="w-80 h-80 border border-dashed border-primary rounded-20 flex items-center justify-center cursor-pointer"
        onClick={handleClick}
      >
        <Camera className="w-32 h-32" />
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* preview (업로드 전 base64) */}
      {images.length === 0 &&
        previews.map((src, i) => (
          <div
            key={`preview-${i}`}
            className="w-80 h-80 bg-primary-50 rounded-20"
            style={{ backgroundImage: `url(${src})`, backgroundSize: "cover" }}
          />
        ))}

      {/* uploaded image url (업로드 후) */}
      {images.map((url, i) => (
        <div
          key={`image-${i}`}
          className="w-80 h-80 bg-primary-50 rounded-20"
          style={{ backgroundImage: `url(${url})`, backgroundSize: "cover" }}
        />
      ))}
    </div>
  );
}
