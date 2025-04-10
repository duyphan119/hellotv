import { LatestVideosParams, LatestVideosResponse } from "@/types";
import { objectToQueryString } from "@/utils";
import { useQuery } from "@tanstack/react-query";

type GetLatestVideosProps = {
  params?: LatestVideosParams;
};

type UseGetLatestVideosProps = GetLatestVideosProps;

export const getLatestVideos = async ({
  params = {},
}: GetLatestVideosProps) => {
  const queryString = objectToQueryString(params);

  const response = await fetch(
    `https://phimapi.com/danh-sach/phim-moi-cap-nhat-v3?${queryString}`
  );
  return (await response.json()) as LatestVideosResponse;
};

export default function useGetLatestVideos({
  params = {},
}: UseGetLatestVideosProps) {
  const query = useQuery({
    queryKey: ["latestVideos"],
    queryFn: () => {
      return getLatestVideos({ params });
    },
  });

  return query;
}
