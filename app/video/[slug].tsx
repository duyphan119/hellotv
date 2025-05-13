import VideoDetails from "@/components/VideoDetails";
import useGetVideo from "@/hooks/useGetVideo";
import useGetWatchedVideo from "@/hooks/useGetWatchedVideo";
import { useIsFullscreen } from "@/hooks/useIsFullscreen";
import { useKeepAwake } from "expo-keep-awake";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, SafeAreaView, StatusBar, View } from "react-native";

export default function ScreenVideo() {
  const { slug } = useLocalSearchParams();

  const { data, isLoading } = useGetVideo(slug.toString());

  const { data: watchedVideo } = useGetWatchedVideo(slug.toString());

  const { isFullscreen } = useIsFullscreen();

  useKeepAwake();

  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        flex: 1,
        paddingTop: isFullscreen ? 0 : StatusBar.currentHeight,
      }}
    >
      {isLoading && (
        <View style={{ width: "100%", aspectRatio: 16 / 9 }}>
          <ActivityIndicator
            color="white"
            size={56}
            style={{ margin: "auto" }}
          />
        </View>
      )}
      {!isLoading && data && data.video && (
        <VideoDetails
          video={data.video}
          servers={data.servers}
          watchedVideo={watchedVideo}
        />
      )}
    </SafeAreaView>
  );
}
