import { getWatchingVideos } from "@/utils/asyncStorage";
import { useQuery } from "@tanstack/react-query";

export function useGetWatchingVideos() {
  return useQuery({
    queryKey: ["watching-videos"],
    queryFn: () => getWatchingVideos(),
  });
}
