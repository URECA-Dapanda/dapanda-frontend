import axiosInstance from "@lib/axios";

/**
 * 파일 배열을 받아서 S3에 업로드하고, 최종 publicUrl 리스트를 반환합니다.
 */
export const usePresignedUpload = () => {
  const uploadFiles = async (files: File[]): Promise<string[]> => {
    if (files.length === 0) return [];

    // ✅ 1. 파일명 ASCII로 변환 (한글 제거)
    const renamedFiles = files.map((file, i) => {
      const ext = file.name.split(".").pop() || "jpg";
      const newName = `upload_${Date.now()}_${i}.${ext}`; // 예: upload_1721768283000_0.jpg
      return new File([file], newName, { type: file.type });
    });

    // ✅ 2. S3 presigned URL 요청
    const filenames = renamedFiles.map((file) => file.name);
    console.log("📦 filenames", filenames);

    const { data } = await axiosInstance.post("/api/images/presign", {
      filenames, // ✅ 반드시 여기가 "filenames" 키여야 하고, null이 아니어야 함
    });

    const presignResults = data.data as {
      filename: string;
      url: string;
      publicUrl: string;
      key: string;
    }[];

    // 2. presigned URL로 S3 업로드
    await Promise.all(
      presignResults.map(async (result, idx) => {
        const file = files[idx];
        await fetch(result.url, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });
      })
    );

    // 3. S3 접근 가능한 publicUrl 반환
    return presignResults.map((r) => r.publicUrl);
  };

  return { uploadFiles };
};
