import { LatestVideo } from "@/data/video";
import { Href, Link } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import VideoCard, { VideoCardSkeletion } from "./VideoCard";

type HomeVideosProps = {
  title: string;
  href: Href;
  videos: LatestVideo[];
};

export function HomeVideosSkeleton() {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: "transparent" }]}>title</Text>
      <FlatList
        scrollEnabled={false}
        numColumns={3}
        data={[1, 2, 3, 4, 5, 6]}
        renderItem={({ index }) => <VideoCardSkeletion index={index} />}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}

export default function HomeVideos({ title, href, videos }: HomeVideosProps) {
  return (
    <View style={styles.container}>
      <Link href={href} style={styles.title}>
        {title}
      </Link>
      <FlatList
        scrollEnabled={false}
        numColumns={3}
        data={videos}
        renderItem={({ item: video, index }) => (
          <VideoCard video={video} index={index} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 10, padding: 10 },
  title: {
    color: "white",
    fontSize: 20,
  },
});
