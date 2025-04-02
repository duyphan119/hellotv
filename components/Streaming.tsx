import colors from "@/data/colors";
import { useVideoDetails } from "@/hooks/useVideoDetails";
import { getWatchingVideos, saveWatchingVideos } from "@/utils/asyncStorage";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";

type ContentProps = StreamingProps & {
  currentTime: number;
};

const Content = ({
  source,
  currentTime = 0,
  isFocused,
  onSaveCurrentTime,
  slug,
}: ContentProps) => {
  const player = useVideoPlayer(source, (player) => {
    player.loop = true;
    player.currentTime = currentTime;
    player.play();
    player.addListener("playToEnd", async () => {
      const watchingVideos = await getWatchingVideos();
      const newWatchingVideos = watchingVideos.filter(
        (item) => item.slug !== slug
      );
      await saveWatchingVideos(newWatchingVideos);
    });
  });

  useEffect(() => {
    if (!isFocused) {
      onSaveCurrentTime(player.currentTime, player.duration, true);
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      const timerId = setInterval(() => {
        onSaveCurrentTime(player.currentTime, player.duration, false);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [isFocused]);

  return (
    <VideoView
      style={styles.video}
      player={player}
      allowsFullscreen
      allowsPictureInPicture
    />
  );
};

type StreamingProps = {
  source: string;
  isFocused: boolean;
  onSaveCurrentTime: (
    currentTime: number,
    duration: number,
    invalidateQueries: boolean
  ) => Promise<void>;
  slug: string;
};

export default function Streaming({
  source,
  isFocused,
  onSaveCurrentTime,
  slug,
}: StreamingProps) {
  const { currentTime } = useVideoDetails();
  if (currentTime < 0) return null;
  return (
    <Content
      isFocused={isFocused}
      source={source}
      slug={slug}
      currentTime={currentTime}
      onSaveCurrentTime={onSaveCurrentTime}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: Dimensions.get("window").width,
    aspectRatio: 16 / 9,
    backgroundColor: colors.BLACK,
  },
  controlsContainer: {
    padding: 10,
  },
});
