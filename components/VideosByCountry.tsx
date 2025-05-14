import useGetVideosByCountry from "@/hooks/useGetVideosByCountry";
import HomeVideos from "./HomeVideos";
import HomeVideosSkeleton from "./skeletons/HomeVideosSkeleton";

type VideosByCountryProps = {
  countrySlug: string;
};

export default function VideosByCountry({ countrySlug }: VideosByCountryProps) {
  const { data, isLoading } = useGetVideosByCountry(countrySlug, { limit: 6 });
  if (!data || isLoading) return <HomeVideosSkeleton />;
  return (
    <HomeVideos
      title={data.titlePage}
      href={{
        pathname: "/videos",
        params: {
          countrySlug,
        },
      }}
      videos={data.items}
    />
  );
}
