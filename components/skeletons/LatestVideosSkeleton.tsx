import { FlatList } from "react-native";
import VideoCardSkeletion from "./VideoCardSkeletion";

export default function LatestVideosSkeleton() {
  return (
    <FlatList
      scrollEnabled={false}
      numColumns={3}
      data={[1, 2, 3, 4, 5, 6]}
      renderItem={({ index }) => (
        <VideoCardSkeletion numColumns={3} index={index} />
      )}
    />
  );
}
