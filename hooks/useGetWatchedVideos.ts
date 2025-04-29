import { getWatchedVideos } from "@/data/watchedVideo";
import { useQuery } from "@tanstack/react-query";

export default function useGetWatchedVideos() {
  return useQuery({
    queryKey: ["watchedVideos"],
    queryFn: () => getWatchedVideos(),
    // staleTime: 1000,
  });
}
