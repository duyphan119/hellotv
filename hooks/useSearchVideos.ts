import { searchVideos, SearchVideosParams } from "@/data/video";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useSearchVideos(params: SearchVideosParams) {
  return useInfiniteQuery({
    queryKey: ["searchVideos", params],
    queryFn: ({ pageParam }) => searchVideos({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: ({ pagination: { currentPage, totalPages } }) =>
      currentPage + 1 > totalPages ? undefined : currentPage + 1,
    staleTime: 345,
  });
}
