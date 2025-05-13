import {
  createWatchedVideo,
  deleteWatchedVideo,
  WatchedVideo,
} from "@/data/watchedVideo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteWatchedVideo(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteWatchedVideo(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchedVideos"] });
      slug &&
        queryClient.invalidateQueries({ queryKey: ["watchedVideo", slug] });
    },
  });
}
