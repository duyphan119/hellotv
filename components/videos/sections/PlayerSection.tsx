import { useVideoPlayer, VideoView } from "expo-video";
import { Dimensions, StatusBar, StyleSheet, View } from "react-native";

type PlayerSectionProps = {
  source: string;
  currentTime: number;
  onUpdateTime: (newTime: number) => void;
  setDuration: (duration: number) => void;
  onPlayToEnd: () => void;
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function PlayerSection({
  currentTime,
  source,
  onUpdateTime,
  setDuration,
  onPlayToEnd,
}: PlayerSectionProps) {
  const player = useVideoPlayer(source, (player) => {
    player.currentTime = currentTime;
    player.play();
    player.timeUpdateEventInterval = 1;

    player.addListener("statusChange", ({ status }) => {
      if (status !== "readyToPlay") {
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
    <View
      style={{
        width: SCREEN_WIDTH,
        aspectRatio: 16 / 9,
        marginTop: StatusBar.currentHeight,
      }}
    >
      <VideoView player={player} style={{ width: "100%", height: "100%" }} />
    </View>
  );
}

const styles = StyleSheet.create({});
