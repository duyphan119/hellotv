import colors from "@/data/colors";
import { ServerData } from "@/types";
import { useVideoPlayer, VideoView } from "expo-video";
import { Dimensions } from "react-native";

type VideoPlayerProps = {
  serverData: ServerData;
  defaultCurrentTime: number;
  setCurrentTime: (currentTime: number) => void;
  onChangeNextServerData: () => void;
  setDuration: (duration: number) => void;
};

const VideoPlayer = ({
  serverData,
  defaultCurrentTime,
  setCurrentTime,
  onChangeNextServerData,
  setDuration,
}: VideoPlayerProps) => {
  const player = useVideoPlayer(serverData.link_m3u8, (player) => {
    player.currentTime = defaultCurrentTime;
    player.play();
    player.timeUpdateEventInterval = 1;
    player.staysActiveInBackground = false;

    player.addListener("statusChange", ({ status }) => {
      if (status !== "readyToPlay") {
        setDuration(player.duration);
      }
    });
    player.addListener("timeUpdate", ({ currentTime }) => {
      setCurrentTime(currentTime);
    });
    player.addListener("playToEnd", () => {
      onChangeNextServerData();
    });
  });

  return (
    <VideoView
      style={{
        backgroundColor: colors.BACKGROUND,
        width: Dimensions.get("window").width,
        aspectRatio: 16 / 9,
      }}
      player={player}
      allowsFullscreen
      allowsPictureInPicture
      nativeControls={true}
    />
  );
};

export default VideoPlayer;
