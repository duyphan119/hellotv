import { VideosParams, VideosResponse } from "@/types";
import { objectToQueryString } from "@/utils";
import { useQuery } from "@tanstack/react-query";

type GetVideosByCountryProps = {
  countrySlug: string;
  params?: Omit<VideosParams, "country">;
};

type UseGetVideosByCountryProps = GetVideosByCountryProps;

export const getVideosByCountry = async ({
  countrySlug,
  params = {},
}: GetVideosByCountryProps) => {
  const queryString = objectToQueryString(params);

  const response = await fetch(
    `https://phimapi.com/v1/api/quoc-gia/${countrySlug}?${queryString}`
  );
  return (await response.json()).data as VideosResponse;
};

export default function useGetVideosByCountry({
  countrySlug,
  params = {},
}: UseGetVideosByCountryProps) {
  const query = useQuery({
    queryKey: ["videos-country", countrySlug],
    queryFn: () => getVideosByCountry({ params, countrySlug }),
  });

  return query;
}
