import { globalStyles } from "@/utils/styles";
import { useVideoPlayer, VideoView } from "expo-video";
import { useRef } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";

type PlayerSectionProps = {
  source: string;
  defaultTime: number;
  onUpdateTime: (newTime: number) => void;
  setDuration: (duration: number) => void;
  onPlayToEnd: () => void;
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

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
  onUpdateTime,
  setDuration,
  onPlayToEnd,
}: PlayerSectionProps) {
  const videoViewRef = useRef<VideoView | null>(null);

  const player = useVideoPlayer(source, (player) => {
    player.currentTime = defaultTime;
    player.play();
    player.timeUpdateEventInterval = 1;

    player.addListener("statusChange", ({ status }) => {
      if (status === "readyToPlay") {
        setDuration(player.duration);
      }
    });

    player.addListener("timeUpdate", ({ currentTime }) => {
      onUpdateTime(currentTime);
    });

    player.addListener("playToEnd", () => {
      onPlayToEnd();
    });
  });
  return (
    <>
      <View
        style={{
          width: "100%",
          aspectRatio: 16 / 9,
        }}
      >
        <VideoView
          ref={videoViewRef}
          player={player}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
