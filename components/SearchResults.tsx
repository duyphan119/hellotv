import { SearchVideosParams } from "@/data/video";
import useSearchVideos from "@/hooks/useSearchVideos";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import VideoCard from "./VideoCard";
import { LatestVideosSkeleton } from "./LatestVideosCarousel";

type SearchResultsProps = {
  params: SearchVideosParams;
};

export default function SearchResults({ params }: SearchResultsProps) {
  const { data, hasNextPage, fetchNextPage } = useSearchVideos(params);
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
