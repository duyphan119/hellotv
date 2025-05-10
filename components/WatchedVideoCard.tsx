import { WatchedVideo } from "@/data/watchedVideo";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type WatchedVideoCardProps = {
  item: WatchedVideo;
  index?: number;
};

export default function WatchedVideoCard({
  item,
  index = 0,
}: WatchedVideoCardProps) {
  return (
    <TouchableOpacity style={{ marginTop: index > 0 ? 10 : 0 }}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.video.thumbnail }} style={styles.image} />
        <View
          style={[
            {
              width: `${
                (100 * item.episode.currentTime) / item.episode.duration
              }%`,
            },
            styles.currentTime,
          ]}
        />
        <BlurView style={styles.duration} />
      </View>
      <Text style={styles.name}>
        {item.video.name} - {item.episode.name}
      </Text>
    </TouchableOpacity>
  );
}

export function WatchedVideoCardSkeleton({
  index = 0,
}: Omit<WatchedVideoCardProps, "item">) {
  return (
    <View style={{ marginTop: index > 0 ? 10 : 0 }}>
      <View style={styles.image}>
        <ActivityIndicator color="white" style={styles.loader} />
      </View>
      <Text style={styles.transparentName}>Name</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: { position: "relative" },
  image: { width: "100%", aspectRatio: 16 / 9, borderRadius: 3 },
  currentTime: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 4,
    backgroundColor: "red",
    opacity: 0.5,
    zIndex: 2,
  },
  duration: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 4,
    zIndex: 1,
  },
  name: { color: "white", marginTop: 10 },
  loader: {
    margin: "auto",
  },
  transparentName: {
    color: "transparent",
    marginTop: 10,
  },
});
