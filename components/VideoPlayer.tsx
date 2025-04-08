import colors from "@/data/colors";
import { useVideoDetails } from "@/hooks/useVideoDetails";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef } from "react";
import { AppState, Dimensions, View } from "react-native";
import PlayerControls from "./PlayerControls";

type VideoPlayerProps = {
  currentTime: number;
  source: string;
  onCloseStreaming?: () => void;
};

const VideoPlayer = ({
  source,
  currentTime = 0,
  onCloseStreaming,
}: VideoPlayerProps) => {
  const { isFocused, onSaveCurrentTime } = useVideoDetails();

  const player = useVideoPlayer(source, (player) => {
    player.currentTime = currentTime;
    player.play();
  });

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState !== "active") {
        onSaveCurrentTime(player.currentTime, player.duration, true);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

  useEffect(() => {
    if (!isFocused) {
      onSaveCurrentTime(player.currentTime, player.duration, true);
      onCloseStreaming?.();
    }
  }, [isFocused]);

  return (
    <View
      style={{
        position: "relative",
        width: Dimensions.get("window").width,
        aspectRatio: 16 / 9,
      }}
    >
      <VideoView
        style={{
          backgroundColor: colors.BLACK,
          width: "100%",
          height: "100%",
        }}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        nativeControls={false}
      />
      <PlayerControls player={player} />
    </View>
  );
};

export default VideoPlayer;
