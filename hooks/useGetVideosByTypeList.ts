import { getVideosByTypeList, TypeList, VideosParams } from "@/data/video";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export default function useGetVideosByTypeList(
  typeList: TypeList,
  params?: VideosParams
) {
  return useInfiniteQuery({
    queryKey: ["videos", typeList],
    queryFn: ({ pageParam }) =>
      getVideosByTypeList(typeList, {
        ...params,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: ({ pagination: { currentPage, totalPages } }) =>
      Math.min(currentPage + 1, totalPages),
  });
}
