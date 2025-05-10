import { VideoServer } from "@/data/video";
import { useScreenOrientation } from "@/hooks/useScreenOrientation";
import { formatSecondsToHMS } from "@/utils";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useEvent } from "expo";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { useVideoPlayer, VideoSource, VideoView } from "expo-video";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type VideoPlayerProps = {
  source: VideoSource;
  title: string;
  defaultTime: number;
  servers?: VideoServer[];
  onNext: () => void;
  onPrevious: () => void;
  onSave: (currentTime: number, duration: number) => void;
};

export default function VideoPlayer({
  source,
  title,
  defaultTime,
  servers = [],
  onNext,
  onPrevious,
  onSave,
}: VideoPlayerProps) {
  const router = useRouter();

  const { isLandscape, setIsLandscape } = useScreenOrientation();

  const [currentTime, setCurrentTime] = React.useState<number>(defaultTime);
  const [duration, setDuration] = React.useState<number>(0);
  const [controlsVisible, setControlsVisible] = React.useState<boolean>(false);
  const [episodesVisible, setEpisodesVisible] = React.useState<boolean>(false);
  // const [isFullscreen, setIsFullscreen] = React.useState<boolean>(false);

  const timeoutRef = React.useRef<any>(null);

  const player = useVideoPlayer(source, (player) => {
    player.play();
    player.currentTime = defaultTime;
    player.timeUpdateEventInterval = 1;

    player.addListener("timeUpdate", ({ currentTime }) => {
      setCurrentTime(currentTime);

      const floorCurrentTime = Math.floor(currentTime);

      if (floorCurrentTime && floorCurrentTime % 10 === 0) {
        onSave(currentTime, player.duration);
      }
    });

    player.addListener("statusChange", ({ status }) => {
      if (status === "readyToPlay") {
        setDuration(player.duration);
      }
    });
  });

  const videoViewRef = React.useRef<VideoView | null>(null);

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: true,
  });

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3333);
  };

  const lockPortrait = () => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    ).then(() => {
      setIsLandscape(false);
    });
    ScreenOrientation.unlockAsync();
  };

  const lockLandscape = () => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    ).then(() => {
      setIsLandscape(true);
    });
    ScreenOrientation.unlockAsync();
  };

  const handleBack = () => {
    resetTimeout();
    if (isLandscape) {
      lockPortrait();
    } else {
      router.back();
    }
  };
  const handlePlayPause = () => {
    resetTimeout();
    isPlaying ? player.pause() : player.play();
  };

  const handleNext = () => {
    resetTimeout();
    onNext();
  };

  const handlePrevious = () => {
    resetTimeout();
    onPrevious();
  };

  const handleSkip10s = () => {
    resetTimeout();
    player.pause();
    player.currentTime = Math.min(duration, player.currentTime + 9);
    player.play();
  };

  const handleReplay10s = () => {
    resetTimeout();
    player.pause();
    player.currentTime = Math.max(player.currentTime - 9, 0);
    player.play();
  };

  const toggleControlsVisible = () => {
    resetTimeout();
    setControlsVisible((previousState) => !previousState);
  };

  const handleFullscreen = () => {
    if (isLandscape) {
      lockPortrait();
    } else {
      lockLandscape();
    }
  };

  React.useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    // ScreenOrientation.getOrientationAsync().then((orientation) => {
    //   const compared =
    //     orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT ||
    //     orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT;
    //   // setIsFullscreen(compared);
    //   setIsLandscape(compared);
    //   ScreenOrientation.lockAsync(
    //     compared
    //       ? ScreenOrientation.OrientationLock.LANDSCAPE
    //       : ScreenOrientation.OrientationLock.PORTRAIT
    //   );
    // });
  }, []);

  React.useEffect(() => {
    const subscription = ScreenOrientation.addOrientationChangeListener(
      ({ orientationInfo: { orientation } }) => {
        if (
          orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT ||
          orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT
        ) {
          lockLandscape();
        } else {
          lockPortrait();
        }
      }
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  return (
    <View style={styles.container}>
      <VideoView
        ref={videoViewRef}
        player={player}
        allowsFullscreen
        nativeControls={false}
        style={
          isLandscape
            ? { height: "100%", width: "100%" }
            : {
                width: "100%",
                aspectRatio: 16 / 9,
              }
        }
      />
      <Pressable
        onPress={toggleControlsVisible}
        style={styles.videoControlsContainer}
      >
        {controlsVisible && (
          <>
            <View style={styles.groupVideoControlsTop}>
              <TouchableOpacity onPress={handleBack} style={styles.back}>
                <MaterialIcons name="arrow-back" color="white" size={20} />
              </TouchableOpacity>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.groupVideoControlsMiddle}>
              <TouchableOpacity
                onPress={handlePrevious}
                style={styles.videoControl}
              >
                <AntDesign name="stepbackward" color="white" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleReplay10s}
                style={styles.videoControl}
              >
                <MaterialIcons name="replay-10" color="white" size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePlayPause}
                style={styles.videoControl}
              >
                <MaterialIcons
                  name={isPlaying ? "pause" : "play-arrow"}
                  color="white"
                  size={48}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSkip10s}
                style={styles.videoControl}
              >
                <MaterialIcons name="forward-10" color="white" size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleNext}
                style={styles.videoControl}
              >
                <AntDesign name="stepforward" color="white" size={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.groupVideoControlsBottom}>
              <Text style={styles.currentTime}>
                {formatSecondsToHMS(currentTime)}
              </Text>
              <Slider
                maximumTrackTintColor="white"
                minimumTrackTintColor="red"
                minimumValue={0}
                maximumValue={duration}
                step={1}
                thumbTintColor="red"
                value={currentTime}
                onSlidingComplete={(value) => {
                  player.currentTime = value;

                  setCurrentTime(value);
                }}
                style={styles.timeSlider}
              />
              <Text style={styles.duration}>
                {formatSecondsToHMS(duration)}
              </Text>
              <TouchableOpacity
                onPress={handleFullscreen}
                style={styles.fullscreen}
              >
                <MaterialIcons
                  name={isLandscape ? "fullscreen-exit" : "fullscreen"}
                  color="white"
                  size={28}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "black",
  },

  videoControlsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  groupVideoControlsTop: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    // flex: 1,
    backgroundColor: "black",
    opacity: 0.7,
  },
  back: { padding: 10 },
  title: {
    color: "white",
    flex: 1,
  },
  groupVideoControlsMiddle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  groupVideoControlsBottom: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "black",
    opacity: 0.7,
  },
  videoControl: { padding: 10 },
  currentTime: { color: "white" },
  timeSlider: {
    flex: 1,
  },
  duration: { color: "white" },
  fullscreen: { marginLeft: 5 },
});
