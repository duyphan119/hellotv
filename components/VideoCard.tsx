import { LatestVideo } from "@/data/video";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type VideoCardProps = {
  video: LatestVideo;
  index: number;
  numColumns?: number;
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export function VideoCardSkeletion({
  index,
  numColumns = 3,
}: Omit<VideoCardProps, "video">) {
  const gapItems = (numColumns - 1) * 10;
  const paddingInline = 2 * 10;
  return (
    <View
      style={{
        width: (SCREEN_WIDTH - paddingInline - gapItems) / numColumns,
        marginLeft: index % numColumns !== 0 ? 10 : 0,
        marginTop: index >= numColumns ? 10 : 0,
      }}
    >
      <BlurView style={styles.imageContainer}>
        <ActivityIndicator style={{ margin: "auto" }} color="white" />
      </BlurView>
      <Text style={[styles.videoName, { color: "transparent" }]}>Name</Text>
    </View>
  );
}

export default function VideoCard({
  video,
  index,
  numColumns = 3,
}: VideoCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/video/[slug]",
      params: {
        slug: video.slug,
      },
    });
  };

  const gapItems = (numColumns - 1) * 10;
  const paddingInline = 2 * 10;

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        width: (SCREEN_WIDTH - paddingInline - gapItems) / numColumns,
        marginLeft: index % numColumns !== 0 ? 10 : 0,
        marginTop: index >= numColumns ? 10 : 0,
      }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: video.poster || video.thumbnail }}
          contentFit="cover"
          style={styles.image}
        />
        <BlurView style={styles.language} intensity={70} tint="dark">
          <Text style={styles.languageText}>{video.language}</Text>
        </BlurView>
        <BlurView style={styles.episodeCurrent} intensity={70} tint="dark">
          <Text style={styles.episodeCurrentText}>{video.episodeCurrent}</Text>
        </BlurView>
      </View>
      <Text style={styles.videoName}>{video.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 9 / 16,
    borderRadius: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  language: { position: "absolute", top: 0, left: 0, padding: 2 },
  episodeCurrent: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 2,
  },
  languageText: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },
  episodeCurrentText: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },
  videoName: {
    color: "white",
    marginTop: 5,
  },
});
