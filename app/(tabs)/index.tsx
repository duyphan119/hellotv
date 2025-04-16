import LatestVideosSection from "@/components/videos/sections/LatestVideosSection";
import VideosByCountrySection from "@/components/videos/sections/VideosByCountrySection";
import VideosByTypeListSection from "@/components/videos/sections/VideosByTypeListSection";
import WatchedVideosSection from "@/components/videos/sections/WatchedVideosSection";
import { TypeList } from "@/data/video";
import useGetLatestVideos from "@/hooks/useGetLatestVideos";
import { globalStyles } from "@/utils/styles";
import { ScrollView } from "react-native";

export default function Index() {
  const latestVideosQuery = useGetLatestVideos();

  return (
    <ScrollView style={globalStyles.container}>
      <LatestVideosSection
        videos={latestVideosQuery.data?.pages?.[0]?.items.slice(0, 6) || []}
      />
      <WatchedVideosSection />
      {["han-quoc", "trung-quoc", "nhat-ban"].map((countrySlug) => (
        <VideosByCountrySection key={countrySlug} countrySlug={countrySlug} />
      ))}
      {(["phim-bo", "phim-le", "tv-shows"] as TypeList[]).map((typeList) => (
        <VideosByTypeListSection key={typeList} typeList={typeList} />
      ))}
    </ScrollView>
  );
}
