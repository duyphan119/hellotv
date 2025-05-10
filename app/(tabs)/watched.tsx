import WatchedVideoCard, {
  WatchedVideoCardSkeleton,
} from "@/components/WatchedVideoCard";
import useGetWatchedVideos from "@/hooks/useGetWatchedVideos";
import { FlatList, StyleSheet, View } from "react-native";

export default function TabWatched() {
  const { data } = useGetWatchedVideos();

  return (
    <View style={styles.container}>
      {data ? (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <WatchedVideoCard item={item} index={index} />
          )}
          keyExtractor={(item, index) => item.video.slug + index}
        />
      ) : (
        <FlatList
          data={[1, 2, 3]}
          renderItem={({ item, index }) => (
            <WatchedVideoCardSkeleton index={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    position: "relative",
    flex: 1,
    gap: 10,
    backgroundColor: "black",
  },
});
