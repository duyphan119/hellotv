import useGetWatchedVideos from "@/hooks/useGetWatchedVideos";
import { globalStyles } from "@/utils/styles";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Watched() {
  const { data } = useGetWatchedVideos();

  const router = useRouter();

  const paddingInline = 2 * 10;

  if (!data) return null;
  return (
    <View style={globalStyles.container}>
      <FlatList
        style={{ padding: 10 }}
        data={data}
        renderItem={({ item: { video, episode }, index }) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/video/[slug]",
                params: {
                  slug: video.slug,
                },
              });
            }}
            style={[
              {
                width: SCREEN_WIDTH - 20,
                marginTop: index > 0 ? 10 : 0,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              },
            ]}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: video.thumbnail || video.poster }}
                contentFit="cover"
                style={styles.image}
              />
              <View style={styles.timeWatchedContainer}>
                <View
                  style={{
                    height: "100%",
                    backgroundColor: globalStyles.textPrimary.color,
                    width: `${(100 * episode.currentTime) / episode.duration}%`,
                    opacity: 0.5,
                  }}
                ></View>
                <BlurView
                  intensity={50}
                  tint="dark"
                  style={{
                    height: "100%",
                    width: `${
                      ((episode.duration - episode.currentTime) * 100) /
                      episode.duration
                    }%`,
                  }}
                ></BlurView>
              </View>
            </View>
            <Text style={[globalStyles.text, { flexWrap: "wrap", flex: 1 }]}>
              {video.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    width: "40%",
    aspectRatio: 16 / 9,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 2,
  },
  language: { position: "absolute", top: 0, left: 0, padding: 2 },
  episodeCurrent: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 2,
  },
  languageText: {
    ...globalStyles.text,
    fontSize: 12,
    textAlign: "center",
  },
  episodeCurrentText: {
    ...globalStyles.text,
    fontSize: 12,
    textAlign: "center",
  },
  timeWatchedContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    height: 4,
  },
});
