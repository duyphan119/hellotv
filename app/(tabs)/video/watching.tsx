import ContainerView from "@/components/ContainerView";
import colors from "@/data/colors";
import { useGetWatchingVideos } from "@/hooks/useGetWatchingVideos";
import { useIsFocused } from "@react-navigation/native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Watching() {
  const isFocused = useIsFocused();

  const router = useRouter();

  const { data } = useGetWatchingVideos();

  if (!isFocused || !data) return null;
  return (
    <ContainerView scrollable>
      {data.map((video, index) => (
        <TouchableOpacity
          key={video.slug}
          onPress={() => {
            router.push({
              pathname: "/(tabs)/video/[video_slug]",
              params: {
                video_slug: video.slug,
                episodeSlug: video.episodeSlug,
                serverName: video.serverName,
              },
            });
          }}
          style={[styles.video, { marginTop: index > 0 ? 10 : 0 }]}
        >
          <View style={{ position: "relative" }}>
            <Image
              source={video.thumbnailUrl || video.posterUrl}
              style={styles.videoImage}
            />
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              <View
                style={{
                  width:
                    ((SCREEN_WIDTH / 3) * video.currentTime) / video.duration,
                  height: 3,
                  backgroundColor: colors.PINK,
                  borderBottomEndRadius: 5,
                  borderBottomStartRadius: 5,
                }}
              ></View>
              <View
                style={{
                  flex: 1,
                  height: 3,
                  backgroundColor: colors.DARK,
                  borderBottomEndRadius: 5,
                  borderBottomStartRadius: 5,
                }}
              ></View>
            </View>
          </View>

          <Text style={styles.videoName}>{video.name}</Text>
        </TouchableOpacity>
      ))}
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingVertical: 12,
    color: colors.WHITE,
    paddingInline: 5,
  },

  video: {
    position: "relative",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  videoImage: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_WIDTH / 4,
    borderRadius: 5,
  },
  videoName: {
    color: colors.WHITE,
    padding: 2,
  },
});
