import useGetLatestVideos from "@/hooks/useGetLatestVideos";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { LatestVideosSkeleton } from "./LatestVideosCarousel";
import VideoCard from "./VideoCard";

export default function LatestVideos() {
  const { data, hasNextPage, fetchNextPage } = useGetLatestVideos();
  if (!data) return <LatestVideosSkeleton />;
  return (
    <FlatList
      numColumns={3}
      data={data.pages.map(({ items }) => items).flat()}
      renderItem={({ item: video, index }) => (
        <VideoCard numColumns={3} video={video} index={index} />
      )}
      onEndReached={() => {
        hasNextPage && fetchNextPage();
      }}
      ListFooterComponent={() =>
        hasNextPage && (
          <View style={{ alignItems: "center" }}>
            <ActivityIndicator size={28} color="white" />
          </View>
        )
      }
    />
  );
}

const styles = StyleSheet.create({});
