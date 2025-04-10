import { deleteWatchingVideos } from "@/utils/asyncStorage";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteWatchingVideos() {
  return useMutation({
    mutationFn: (slugs: string[]) => deleteWatchingVideos(slugs),
  });
}
