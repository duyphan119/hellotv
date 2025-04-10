import colors from "@/data/colors";
import { Episode, ServerData, Video } from "@/types";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { useRef, useState } from "react";
import { Dimensions, Pressable, TouchableOpacity, View } from "react-native";

type VideoPlayerProps = {
  serverData: ServerData;
  episode: Episode;
  video: Video;
  defaultCurrentTime: number;
  currentTime: number;
  setCurrentTime: (currentTime: number) => void;
  onChangeNextServerData: () => void;
  onChangePreviousServerData: () => void;
  setDuration: (duration: number) => void;
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const VideoPlayer = ({
  serverData,
  defaultCurrentTime,
  currentTime,
  setCurrentTime,
  onChangePreviousServerData,
  onChangeNextServerData,
  setDuration,
}: VideoPlayerProps) => {
  const [controlsVisible, setControlsVisible] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const timeoutRef = useRef<any>(null);

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

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const resetCloseTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3333);
  };

  const toggleControlsVisible = () => {
    setControlsVisible((prev) => {
      const newState = !prev;
      if (newState) resetCloseTimer();
      return newState;
    });
  };

  const videoViewRef = useRef<VideoView | null>(null);

  return (
    <View
      style={{
        position: "relative",
        width: Dimensions.get("window").width,
        aspectRatio: 16 / 9,
      }}
    >
      <VideoView
        ref={videoViewRef}
        style={{
          backgroundColor: colors.BACKGROUND,
          width: "100%",
          height: "100%",
        }}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        nativeControls={false}
        onFullscreenEnter={() => {
          setIsFullscreen(true);
        }}
        onFullscreenExit={() => {
          setIsFullscreen(false);
        }}
      />
      <Pressable
        onPress={toggleControlsVisible}
        style={[
          {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
          controlsVisible ? { backgroundColor: "black", opacity: 0.4 } : {},
        ]}
      >
        {controlsVisible && (
          <>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  resetCloseTimer();
                  player.currentTime = Math.max(player.currentTime - 10, 0);
                }}
                style={{
                  padding: 10,
                }}
              >
                <MaterialIcons name="replay-10" size={36} color={colors.TEXT} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  resetCloseTimer();
                  onChangePreviousServerData();
                }}
                style={{
                  padding: 10,
                  transform: [
                    {
                      rotate: "180deg",
                    },
                  ],
                }}
              >
                <Entypo name="controller-next" size={36} color={colors.TEXT} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  resetCloseTimer();
                  if (isPlaying) {
                    player.pause();
                  } else {
                    player.play();
                  }
                }}
                style={{ padding: 10 }}
              >
                <Entypo
                  name={isPlaying ? "controller-paus" : "controller-play"}
                  size={36}
                  color={colors.TEXT}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  resetCloseTimer();
                  onChangeNextServerData();
                }}
                style={{ padding: 10 }}
              >
                <Entypo name="controller-next" size={36} color={colors.TEXT} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  resetCloseTimer();
                  player.currentTime = Math.min(
                    player.currentTime + 10,
                    player.duration
                  );
                }}
                style={{
                  padding: 10,
                }}
              >
                <MaterialIcons
                  name="forward-10"
                  size={36}
                  color={colors.TEXT}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Slider
                style={{
                  flex: 1,
                }}
                minimumValue={0}
                maximumValue={player.duration}
                step={0.1}
                value={currentTime}
                minimumTrackTintColor={colors.DANGER}
                maximumTrackTintColor={colors.BACKGROUND}
                thumbTintColor="transparent"
                onSlidingComplete={(value) => {
                  player.currentTime = value;
                }}
              />
              <TouchableOpacity
                onPress={async () => {
                  resetCloseTimer();
                  // videoViewRef.current?.startPictureInPicture();
                  if (isFullscreen) {
                    videoViewRef.current?.exitFullscreen();
                  } else {
                    videoViewRef.current?.enterFullscreen();
                  }
                }}
                style={{
                  padding: 10,
                }}
              >
                <MaterialIcons
                  name={isFullscreen ? "fullscreen-exit" : "fullscreen"}
                  size={28}
                  color={colors.TEXT}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </Pressable>
    </View>
  );
};

export default VideoPlayer;
