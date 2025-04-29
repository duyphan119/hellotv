import { globalStyles } from "@/utils/styles";
import { useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  AppState,
  BackHandler,
  StyleSheet,
  View,
} from "react-native";

type PlayerSectionProps = {
  source: string;
  defaultTime: number;
  onSaveCurrentTime: (
    currentTime: number,
    duration: number,
    onSettled?: () => void
  ) => void;
};

export const PlayerSkeletonSection = () => {
  return (
    <View
      style={{
        width: "100%",
        aspectRatio: 16 / 9,
      }}
    >
      <ActivityIndicator
        style={{ margin: "auto" }}
        size={48}
        color={globalStyles.textSecondary.color}
      />
    </View>
  );
};

export default function PlayerSection({
  defaultTime,
  source,
  onSaveCurrentTime,
}: PlayerSectionProps) {
  const router = useRouter();

  const videoViewRef = useRef<VideoView | null>(null);

  const player = useVideoPlayer(source, (player) => {
    player.currentTime = defaultTime;
    player.play();
  });

  useEffect(() => {
    const appState = AppState.addEventListener("change", (state) => {
      if (state !== "active")
        onSaveCurrentTime(player.currentTime, player.duration);
    });

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        onSaveCurrentTime(player.currentTime, player.duration, () => {
          router.canGoBack() && router.back();
        });
        return true;
      }
    );

    return () => {
      appState.remove();
      backHandler.remove();
    };
  }, [player.currentTime, player.duration]);

  return (
    <View style={styles.container}>
      <VideoView
        ref={videoViewRef}
        player={player}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
    position: "relative",
  },
});
