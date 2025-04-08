import colors from "@/data/colors";
import { useVideoDetails } from "@/hooks/useVideoDetails";
import { getWatchingVideos, saveWatchingVideos } from "@/utils/asyncStorage";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { useEvent } from "expo";
import { useVideoPlayer, VideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import {
  AppState,
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Slider from "@react-native-community/slider";

type PlayerControlsProps = {
  player: VideoPlayer;
  onPressNext?: () => void;
  onPressPrevious?: () => void;
  onTogglePlayPause?: () => void;
};

const PlayerControls = ({ player }: PlayerControlsProps) => {
  const [open, setOpen] = useState<boolean>(true);

  const timeoutRef = useRef<any>(null);

  const { onPressNext: handlePressNext, onPressPrevious: handlePressPrevious } =
    useVideoDetails();

  const resetCloseTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 3333);
  };

  const toggleOpen = () => {
    setOpen((prev) => {
      const newState = !prev;
      if (newState) resetCloseTimer();
      return newState;
    });
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const handleSkip10s = () => {
    resetCloseTimer();
    player.currentTime = Math.min(player.currentTime + 10, player.duration);
  };

  const handleBack10s = () => {
    resetCloseTimer();
    player.currentTime = Math.max(player.currentTime - 10, 0);
  };

  return (
    <Pressable
      onPress={toggleOpen}
      style={[
        {
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        open ? { backgroundColor: "black", opacity: 0.4 } : {},
      ]}
    >
      {open && (
        <>
          <View
            style={{
              flex: 1,
              // backgroundColor: "blue",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={handleBack10s}
              style={{
                padding: 10,
              }}
            >
              <MaterialIcons name="replay-10" size={36} color={colors.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePressPrevious}
              style={{
                padding: 10,
                transform: [
                  {
                    rotate: "180deg",
                  },
                ],
              }}
            >
              <Entypo name="controller-next" size={36} color={colors.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
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
                color={colors.WHITE}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePressNext} style={{ padding: 10 }}>
              <Entypo name="controller-next" size={36} color={colors.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSkip10s}
              style={{
                padding: 10,
              }}
            >
              <MaterialIcons name="forward-10" size={36} color={colors.WHITE} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 10,
            }}
          >
            <Slider
              style={{ width: "100%", height: "100%" }}
              minimumValue={0}
              maximumValue={player.duration}
              step={0.1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onSlidingComplete={(value) => {
                player.currentTime = value;
              }}
              onValueChange={() => {
                resetCloseTimer();
              }}
            />
          </View>
        </>
      )}
    </Pressable>
  );
};

export default PlayerControls;
