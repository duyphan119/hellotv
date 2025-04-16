import { LatestVideo } from "@/data/video";
import { WatchedVideo } from "@/data/watchedVideo";
import { globalStyles } from "@/utils/styles";
import Slider from "@react-native-community/slider";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type WatchedVideoCardProps = {
  video: WatchedVideo;
  index: number;
  style?: ViewStyle;
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function WatchedVideoCard({
  video: { video, episode },
  index,
  style,
}: WatchedVideoCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/video/[slug]",
      params: {
        slug: video.slug,
      },
    });
  };

  const paddingInline = 2 * 10;

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        {
          width: (SCREEN_WIDTH - paddingInline) / 3,
          ...(index
            ? {
                marginLeft: index % 3 !== 0 ? 10 : 0,
                marginTop: index >= 3 ? 10 : 0,
              }
            : {}),
        },
        style,
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: video.thumbnail || video.poster }}
          contentFit="cover"
          style={styles.image}
        />
        <View style={styles.timeWatchedContainer}>
          <View
            style={{
              height: "100%",
              backgroundColor: globalStyles.textPrimary.color,
              width: `${(100 * episode.currentTime) / episode.duration}%`,
              opacity: 0.5,
            }}
          ></View>
          <BlurView
            intensity={50}
            tint="dark"
            style={{
              height: "100%",
              width: `${
                ((episode.duration - episode.currentTime) * 100) /
                episode.duration
              }%`,
            }}
          ></BlurView>
        </View>
      </View>
      <Text style={[globalStyles.text]}>{video.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 16 / 9,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 2,
  },
  language: { position: "absolute", top: 0, left: 0, padding: 2 },
  episodeCurrent: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 2,
  },
  languageText: {
    ...globalStyles.text,
    fontSize: 12,
    textAlign: "center",
  },
  episodeCurrentText: {
    ...globalStyles.text,
    fontSize: 12,
    textAlign: "center",
  },
  timeWatchedContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    height: 4,
  },
});
