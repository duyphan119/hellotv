import colors from "@/data/colors";
import { useVideoDetails } from "@/hooks/useVideoDetails";
import { getWatchingVideos, saveWatchingVideos } from "@/utils/asyncStorage";
import { useVideoPlayer, VideoView } from "expo-video";
import { Dimensions, StyleSheet } from "react-native";

type ContentProps = StreamingProps & {
  currentTime: number;
};

const Content = ({
  source,
  currentTime = 0,
  onSaveCurrentTime,
  slug,
}: ContentProps) => {
  const player = useVideoPlayer(source, (player) => {
    player.loop = true;
    player.currentTime = currentTime;
    player.timeUpdateEventInterval = 2;
    player.play();
    player.addListener("playToEnd", async () => {
      const watchingVideos = await getWatchingVideos();
      const newWatchingVideos = watchingVideos.filter(
        (item) => item.slug !== slug
      );
      await saveWatchingVideos(newWatchingVideos);
    });
    player.addListener("timeUpdate", (event) => {
      onSaveCurrentTime(event.currentTime, player.duration, false);
    });
  });

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
  onSaveCurrentTime: (
    currentTime: number,
    duration: number,
    invalidateQueries: boolean
  ) => Promise<void>;
  slug: string;
};

export default function Streaming({
  source,
  onSaveCurrentTime,
  slug,
}: StreamingProps) {
  const { currentTime } = useVideoDetails();
  if (currentTime < 0) return null;
  return (
    <Content
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
