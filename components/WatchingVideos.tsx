import colors from "@/data/colors";
import { useGetWatchingVideos } from "@/hooks/useGetWatchingVideos";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WatchingVideos() {
  const router = useRouter();

  const { data } = useGetWatchingVideos();

  if (!data || data.length === 0) return null;

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/(tabs)/video/watching",
          });
        }}
      >
        <Text style={styles.title}>Đang xem</Text>
      </TouchableOpacity>
      <ScrollView horizontal showsHorizontalScrollIndicator>
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
            style={[styles.video, { marginLeft: index > 0 ? 10 : 0 }]}
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
                      ((Dimensions.get("window").width / 3 - 10) *
                        video.currentTime) /
                      video.duration,
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
      </ScrollView>
    </View>
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
    width: Dimensions.get("window").width / 3 - 10,
    position: "relative",
  },
  videoImage: {
    width: "100%",
    aspectRatio: 4 / 3,
    borderRadius: 5,
  },
  videoName: {
    color: colors.WHITE,
    padding: 2,
  },
});
