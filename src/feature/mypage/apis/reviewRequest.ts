import { ReviewType } from "@feature/mypage/types/reviewType";
import axios from "@/lib/axios";

export async function getReviewList({
  pageParam = 0,
  size = 2,
}: {
  pageParam?: number | unknown;
  size: number;
}): Promise<{ items: ReviewType[]; nextCursor?: number }> {
  try {
    const response = await axios.get(`/api/reviews/received`, {
      params: { cursorId: pageParam, size: size },
    });

    const rawList = response.data.data.data as ReviewType[];
    const nextCursor = response.data.data.pageInfo.nextCursorId ?? undefined;

    return { items: rawList, nextCursor };
  } catch (e) {
    console.error("리뷰 목록 조회 실패:", e);

    return { items: [], nextCursor: undefined };
  }
}
