import { TypeList } from "@/data/typeList";
import { VideosParams, VideosResponse } from "@/types";
import { objectToQueryString } from "@/utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

type GetVideosByTypeProps = {
  type: TypeList;
  params?: VideosParams;
};

type UseGetVideosByTypeProps = GetVideosByTypeProps;

export const getVideosByType = async ({
  type,
  params = {},
}: GetVideosByTypeProps) => {
  const queryString = objectToQueryString(params);

  const response = await fetch(
    `https://phimapi.com/v1/api/danh-sach/${type}?${queryString}`
  );
  return (await response.json()).data as VideosResponse;
};

export function useGetVideosByTypeInfinite({
  type,
  params = {},
}: UseGetVideosByTypeProps) {
  const query = useInfiniteQuery({
    queryKey: ["videos-type-infinite", type, params],
    queryFn: ({ pageParam }) =>
      getVideosByType({ type, params: { ...params, page: pageParam } }),
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

export default function useGetVideosByType({
  type,
  params = {},
}: UseGetVideosByTypeProps) {
  const query = useQuery({
    queryKey: ["videos-type", type],
    queryFn: () => getVideosByType({ params, type }),
  });

  return query;
}
