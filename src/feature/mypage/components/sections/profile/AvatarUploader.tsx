"use client";

import { useRef } from "react";
import { Pencil } from "lucide-react";
import AvatarIcon from "@components/common/AvatarIcon";
import { usePresignedUpload } from "@hooks/usePresignedUpload";
import { updateProfileImage } from "@feature/mypage/apis/mypageRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AvatarUploaderProps {
  avatarUrl?: string;
}

export default function AvatarUploader({ avatarUrl }: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { uploadFiles } = usePresignedUpload();

  const { mutate } = useMutation({
    mutationFn: updateProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/members/info"] });
    },
    onError: (e: any) => {
      alert(e?.message ?? "프로필 이미지 변경 실패");
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const urls = await uploadFiles([file]);
    if (urls.length > 0) {
      mutate(urls[0]);
    }
  };

  return (
    <div className="relative w-fit">
      <AvatarIcon size="large" avatar={avatarUrl} />
      <button
        onClick={() => inputRef.current?.click()}
        className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
      >
        <Pencil className="w-16 h-16 text-gray-600" />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
