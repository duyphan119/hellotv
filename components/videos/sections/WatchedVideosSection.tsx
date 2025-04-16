import useGetWatchedVideos from "@/hooks/useGetWatchedVideos";
import { globalStyles } from "@/utils/styles";
import { Link } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import WatchedVideoCard from "./WatchedVideoCard";

export default function WatchedVideosSection() {
  const { data } = useGetWatchedVideos();
  if (!data || data.length === 0) return null;
  return (
    <View style={{ gap: 10, padding: 10 }}>
      <Link href="/watched" style={[globalStyles.text, { fontSize: 20 }]}>
        Đã xem gần đây
      </Link>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item: video, index }) => (
          <WatchedVideoCard video={video} index={index} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
