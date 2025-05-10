import ModalVideoContent from "@/components/ModalVideoContent";
import useGetVideo from "@/hooks/useGetVideo";
import useGetWatchedVideo from "@/hooks/useGetWatchedVideo";
import { useScreenOrientation } from "@/hooks/useScreenOrientation";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, SafeAreaView, StatusBar, View } from "react-native";

export default function ScreenVideo() {
  const { slug } = useLocalSearchParams();

  const { data, isLoading } = useGetVideo(slug.toString());

  const { data: watchedVideo } = useGetWatchedVideo(slug.toString());

  const { isLandscape } = useScreenOrientation();

  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        flex: 1,
        paddingTop: isLandscape ? 0 : StatusBar.currentHeight,
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
        <ModalVideoContent
          video={data.video}
          servers={data.servers}
          watchedVideo={watchedVideo}
        />
      )}
    </SafeAreaView>
  );
}
