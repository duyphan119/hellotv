import { VideosParams, VideosResponse } from "@/types";
import { objectToQueryString } from "@/utils";
import { useQuery } from "@tanstack/react-query";

type GetVideosByCategoryProps = {
  categorySlug: string;
  params?: Omit<VideosParams, "category">;
};

type UseGetVideosByCategoryProps = GetVideosByCategoryProps;

export const getVideosByCategory = async ({
  categorySlug,
  params = {},
}: GetVideosByCategoryProps) => {
  const queryString = objectToQueryString(params);

  const response = await fetch(
    `https://phimapi.com/v1/api/the-loai/${categorySlug}?${queryString}`
  );
  return (await response.json()).data as VideosResponse;
};

export default function useGetVideosByCategory({
  categorySlug,
  params = {},
}: UseGetVideosByCategoryProps) {
  const query = useQuery({
    queryKey: ["videos-category", categorySlug],
    queryFn: () => getVideosByCategory({ params, categorySlug }),
  });

  return query;
}
