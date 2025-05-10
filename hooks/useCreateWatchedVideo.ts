import { createWatchedVideo, WatchedVideo } from "@/data/watchedVideo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateWatchedVideo(slug?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (inputs: WatchedVideo) => createWatchedVideo(inputs),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchedVideos"] });
      slug &&
        queryClient.invalidateQueries({ queryKey: ["watchedVideo", slug] });
    },
  });
}
