import { VideosFilterParams } from "@/app/(tabs)/videos";
import useGetVideosFilterResults from "@/hooks/useGetVideosFilterResults";
import { ActivityIndicator, FlatList, View } from "react-native";
import VideoCard from "./VideoCard";
import LatestVideosSkeleton from "./skeletons/LatestVideosSkeleton";

type VideosProps = {
  filter: VideosFilterParams;
};

export default function Videos({ filter }: VideosProps) {
  const { data, hasNextPage, fetchNextPage } =
    useGetVideosFilterResults(filter);
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
