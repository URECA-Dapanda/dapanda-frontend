import { ReviewType } from "@feature/mypage/types/reviewType";
import axios from "@/lib/axios";

export async function getReviewList({
  pageParam,
  size = 5,
  id,
  type,
}: {
  pageParam?: number | unknown;
  size: number;
  id?: string;
  type?: "receive" | "post";
}): Promise<{ items: ReviewType[]; nextCursor?: number }> {
  const request =
    type === "post"
      ? "/api/reviews/wrote"
      : id
      ? `/api/members/${id}/reviews/received`
      : `/api/reviews/received`;
  try {
    const response = await axios.get(request, {
      params: { cursorId: pageParam, size: size },
    });

    const rawList = response.data.data.data as ReviewType[];
    const nextCursor = response.data.data.pageInfo.nextCursorId ?? undefined;

    return { items: rawList, nextCursor };
  } catch (e) {
    console.debug("리뷰 목록 조회 실패:", e);

    return { items: [], nextCursor: undefined };
  }
}
