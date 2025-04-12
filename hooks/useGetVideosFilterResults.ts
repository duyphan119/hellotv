import { VideosFilter } from "@/app/(tabs)/videos";
import { useQuery } from "@tanstack/react-query";
import useGetLatestVideos from "./useGetLatestVideos";
import useGetVideosByTypeList from "./useGetVideosByTypeList";
import { TypeList } from "@/data/video";

export default function useGetVideosFilterResults(filter: VideosFilter) {
  if (filter.typeList === "") return useGetLatestVideos();

  return useGetVideosByTypeList(filter.typeList as TypeList, {
    ...(filter.categorySlug ? { category: filter.categorySlug } : {}),
    ...(filter.countrySlug ? { country: filter.countrySlug } : {}),
    ...(filter.year ? { year: filter.year } : {}),
  });
}
