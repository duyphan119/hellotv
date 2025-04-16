import useGetWatchedVideos from "@/hooks/useGetWatchedVideos";
import { globalStyles } from "@/utils/styles";
import { Link } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import WatchedVideoCard from "./WatchedVideoCard";

export default function WatchedVideosSection() {
  const { data } = useGetWatchedVideos();
  if (!data || data.length === 0) return null;
  return (
    <View style={styles.container}>
      <Link href="/watched" style={styles.title}>
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

const styles = StyleSheet.create({
  container: { gap: 10, padding: 10 },
  title: {
    ...globalStyles.text,
    fontSize: 20,
  },
});
