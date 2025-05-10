import LatestVideosCarousel from "@/components/LatestVideosCarousel";
import VideosByCountry from "@/components/VideosByCountry";
import VideosByTypeList from "@/components/VideosByTypeList";
import { TypeList } from "@/data/video";
import { ScrollView } from "react-native";

export default function TabIndex() {
  return (
    <ScrollView
      style={{
        backgroundColor: "black",
        flex: 1,
      }}
    >
      <LatestVideosCarousel />
      {["han-quoc", "trung-quoc", "nhat-ban"].map((countrySlug) => (
        <VideosByCountry key={countrySlug} countrySlug={countrySlug} />
      ))}
      {(["phim-bo", "phim-le", "tv-shows"] as TypeList[]).map((typeList) => (
        <VideosByTypeList key={typeList} typeList={typeList} />
      ))}
    </ScrollView>
  );
}
