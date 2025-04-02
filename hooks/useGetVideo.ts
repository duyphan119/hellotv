import { Episode, Video } from "@/types";
import { useQuery } from "@tanstack/react-query";

type UseGetVideoProps = {
  slug: string;
};

export default function useGetVideo({ slug }: UseGetVideoProps) {
  const query = useQuery({
    queryKey: ["video", slug],
    queryFn: async () => {
      const response = await fetch(`https://phimapi.com/phim/${slug}`);
      const { movie, episodes } = await response.json();
      return { video: movie, episodes } as {
        video: Video;
        episodes: Episode[];
      };
    },
  });

  return query;
}
