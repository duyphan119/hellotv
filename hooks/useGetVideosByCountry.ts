import { getVideosByCountry, VideosParams } from "@/data/video";
import { useQuery } from "@tanstack/react-query";

export default function useGetVideosByCountry(
  countrySlug: string,
  params?: Omit<VideosParams, "country">
) {
  return useQuery({
    queryKey: ["videos", countrySlug],
    queryFn: () => getVideosByCountry(countrySlug, params),
  });
}
