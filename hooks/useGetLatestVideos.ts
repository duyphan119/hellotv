import { getLatestVideos } from "@/data/video";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useGetLatestVideos() {
  return useInfiniteQuery({
    queryKey: ["latestVideos"],
    queryFn: ({ pageParam }) => getLatestVideos({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: ({ pagination: { currentPage, totalPages } }) =>
      currentPage + 1 > totalPages ? undefined : currentPage + 1,
  });
}
