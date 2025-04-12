import { getWatchedVideo } from "@/data/watchedVideo";
import { useQuery } from "@tanstack/react-query";

export default function useGetWatchedVideo(slug: string) {
  return useQuery({
    queryKey: ["watchedVideo", slug],
    queryFn: () => getWatchedVideo(slug),
  });
}
