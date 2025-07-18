"use client";

interface ChatPostCardProps {
  title: string;
  price: string;
}

export default function ChatPostCard({ title, price }: ChatPostCardProps) {
  const match = title.match(/(\d+)GB/);
  const imageFile = match ? `/${match[1]}.png` : "/default.png";

  return (
    <div className="flex border border-primary-200 rounded-20 h-64 px-16 py-8 bg-white">
      <img
        src={imageFile}
        alt={`${match?.[1]}GB 이미지`}
        className="w-40 h-40 object-contain mr-12 shrink-0"
      />
      <div className="flex flex-col justify-center">
        <div className="body-sm text-gray-800">{title}</div>
        <div className="title-sm text-secondary-600 mt-1">{price}</div>
      </div>
    </div>
  );
}
