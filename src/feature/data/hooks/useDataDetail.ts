// import { useEffect, useState } from "react";
// import { getDataDetail } from "@feature/data/api/dataRequest";
// import { DataDetailResponse } from "@feature/data/types/dataType";

// export const useDataDetail = (postId: string) => {
//   const [data, setData] = useState<DataDetailResponse | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const res = await getDataDetail(postId);
//         setData(res);
//         console.log(res)
//       } catch (e) {
//         console.error("상세 정보 불러오기 실패:", e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetch();
//   }, [postId]);

//   return { data, loading };
// };
import { useQuery } from "@tanstack/react-query";
import { getDataDetail } from "@feature/data/api/dataRequest";
import { DataDetailResponse } from "@feature/data/types/dataType";

export const useDataDetail = (postId: string) => {
  return useQuery<DataDetailResponse>({
    queryKey: ["dataDetail", postId],
    queryFn: () => getDataDetail(postId),
  });
};
