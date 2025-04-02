import ContainerView from "@/components/ContainerView";
import LatestVideoCarousel from "@/components/LatestVideoCarousel";
import VideosSection from "@/components/VideosSection";
import WatchingVideos from "@/components/WatchingVideos";
import { TypeList } from "@/data/typeList";
import useGetVideosByCountry from "@/hooks/useGetVideosByCountry";
import useGetVideosByType from "@/hooks/useGetVideosByType";
import { useIsFocused } from "@react-navigation/native";

type VideosByTypeProps = {
  type: TypeList;
};

function VideosByType({ type }: VideosByTypeProps) {
  const { data } = useGetVideosByType({ type });

  if (!data) return null;

  return (
    <VideosSection
      title={data.titlePage}
      videos={data.items}
      domainCdnImage={data.APP_DOMAIN_CDN_IMAGE}
      params={{ type_list: type }}
    />
  );
}

type VideosByCountryProps = {
  countrySlug: string;
};

function VideosByCountry({ countrySlug }: VideosByCountryProps) {
  const { data } = useGetVideosByCountry({ countrySlug });

  if (!data) return null;

  return (
    <VideosSection
      title={data.titlePage}
      videos={data.items}
      domainCdnImage={data.APP_DOMAIN_CDN_IMAGE}
      params={{ country: countrySlug }}
    />
  );
}

export default function TabIndex() {
  const isFocused = useIsFocused();

  if (!isFocused) return null;

  return (
    <ContainerView scrollable={true}>
      <LatestVideoCarousel />
      <WatchingVideos />
      <VideosByCountry countrySlug="han-quoc" />
      <VideosByCountry countrySlug="trung-quoc" />
      <VideosByCountry countrySlug="nhat-ban" />
      <VideosByType type="phim-bo" />
      <VideosByType type="phim-le" />
      <VideosByType type="hoat-hinh" />
    </ContainerView>
  );
}
