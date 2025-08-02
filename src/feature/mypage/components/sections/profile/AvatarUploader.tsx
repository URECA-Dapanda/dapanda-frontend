"use client";

import { useRef, useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import AvatarIcon from "@components/common/AvatarIcon";
import { usePresignedUpload } from "@hooks/usePresignedUpload";
import { updateProfileImage } from "@feature/mypage/apis/mypageRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface AvatarUploaderProps {
    avatarUrl?: string;
}

export default function AvatarUploader({ avatarUrl }: AvatarUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();
    const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | undefined>(avatarUrl);

    useEffect(() => {
        setCurrentAvatarUrl(avatarUrl);
    }, [avatarUrl]);

    const { uploadFiles } = usePresignedUpload();

    const { mutate } = useMutation({
        mutationFn: updateProfileImage,
        onSuccess: (_, newAvatarUrl) => {
            queryClient.invalidateQueries({ queryKey: ["/api/members/info"] });
            setCurrentAvatarUrl(newAvatarUrl);
            toast.success("프로필 이미지가 변경되었습니다!");
        },
        onError: (e: unknown) => {
            if (e instanceof Error) {
                toast.error(e.message);
            } else {
                toast.error("프로필 이미지 변경 실패");
            }
        },
    });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const urls = await uploadFiles([file]);
            if (urls.length > 0) {
                mutate(urls[0]);
            }
        } catch {
            toast.error("업로드 중 오류가 발생했습니다");
        }
    };

    return (
        <div className="relative w-fit">
            <AvatarIcon size="large" avatar={currentAvatarUrl} />
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
