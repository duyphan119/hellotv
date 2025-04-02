import { SearchVideosParams, VideosResponse } from "@/types";
import { objectToQueryString } from "@/utils";
import { useInfiniteQuery } from "@tanstack/react-query";

type SearchProps = {
  keyword: string;
  params?: SearchVideosParams;
};

type UseSearchProps = SearchProps;

export const search = async ({ keyword, params = {} }: SearchProps) => {
  const response = await fetch(
    `https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}&${objectToQueryString(
      params
    )}`
  );

  const { data } = await response.json();

  return data as VideosResponse;
};

export default function useSearch({ keyword, params }: UseSearchProps) {
  const query = useInfiniteQuery({
    queryKey: ["searchVideos", keyword, params],
    queryFn: ({ pageParam }) =>
      search({ keyword, params: { ...params, page: pageParam } }),
    getNextPageParam: ({ params }, _) => {
      if (!params) return undefined;
      const {
        pagination: { currentPage, totalPages },
      } = params;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  return query;
}
