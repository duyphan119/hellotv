import colors from "@/data/colors";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useEvent } from "expo";
import { VideoPlayer } from "expo-video";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

type VideoControlsProps = {
  player: VideoPlayer;
  currentTime: number;
  onNext: () => void;
  onPrevious: () => void;
};

export default function VideoControls({
  player,
  currentTime,
  onNext,
  onPrevious,
}: VideoControlsProps) {
  const [controlsVisible, setControlsVisible] = useState<boolean>(false);

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const timeoutRef = useRef<any>(null);

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

  return (
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
                onPrevious();
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
                onNext();
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
              <MaterialIcons name="forward-10" size={36} color={colors.TEXT} />
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
              value={currentTime}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onSlidingComplete={(value) => {
                player.currentTime = value;
              }}
            />
          </View>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({});
