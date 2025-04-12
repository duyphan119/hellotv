import { getVideo } from "@/data/video";
import { useQuery } from "@tanstack/react-query";

export default function useGetVideo(slug: string) {
  return useQuery({
    queryKey: ["video", slug],
    queryFn: () => getVideo(slug),
  });
}
