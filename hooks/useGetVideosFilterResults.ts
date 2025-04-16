import { VideosFilter } from "@/app/(tabs)/videos";
import { TypeList } from "@/data/video";
import useGetVideosByTypeList from "./useGetVideosByTypeList";

export default function useGetVideosFilterResults(filter: VideosFilter) {
  return useGetVideosByTypeList(filter.typeList as TypeList, {
    ...(filter.categorySlug ? { category: filter.categorySlug } : {}),
    ...(filter.countrySlug ? { country: filter.countrySlug } : {}),
    ...(filter.year ? { year: filter.year } : {}),
  });
}
