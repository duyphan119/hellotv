import { createWatchedVideo, WatchedVideo } from "@/data/watchedVideo";
import { useMutation } from "@tanstack/react-query";

export default function useCreateWatchedVideo() {
  return useMutation({
    mutationFn: (inputs: WatchedVideo) => createWatchedVideo(inputs),
  });
}
