import { LatestVideo } from "@/data/video";
import { globalStyles } from "@/utils/styles";
import { Href, Link } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import VideoCard from "./VideoCard";

type VideosSectionProps = {
  title: string;
  href: Href;
  videos: LatestVideo[];
};

export default function VideosSection({
  title,
  href,
  videos,
}: VideosSectionProps) {
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
    ...globalStyles.text,
    fontSize: 20,
  },
});
