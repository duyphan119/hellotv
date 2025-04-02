import { WatchingVideo } from "@/types";
import { saveWatchingVideo } from "@/utils/asyncStorage";
import { useMutation } from "@tanstack/react-query";

export function useCreateWatchingVideo() {
  return useMutation({
    mutationFn: (newItem: WatchingVideo) => saveWatchingVideo(newItem),
  });
}
