import { useQuery } from "@tanstack/react-query";
import { getDataDetail } from "@feature/data/api/dataRequest";
import { DataDetailResponse } from "@feature/data/types/dataType";

export const useDataDetail = (postId: string) => {
  return useQuery<DataDetailResponse>({
    queryKey: ["dataDetail", postId],
    queryFn: () => getDataDetail(postId),
  });
};
