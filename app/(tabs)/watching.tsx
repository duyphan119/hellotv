import ContainerView from "@/components/ContainerView";
import colors from "@/data/colors";
import useDeleteWatchingVideos from "@/hooks/useDeleteWatchingVideos";
import { useGetWatchingVideos } from "@/hooks/useGetWatchingVideos";
import { utilStyles } from "@/utils/utilStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "expo-checkbox";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  BackHandler,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Watching() {
  const router = useRouter();

  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [selectingSlugs, setSelectingSlugs] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const { data } = useGetWatchingVideos();

  const { mutate } = useDeleteWatchingVideos();

  const handleReset = () => {
    setIsSelecting(false);
    setSelectingSlugs([]);
  };

  const handleDelete = () => {
    mutate(selectingSlugs, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["watching-videos"] });
        handleReset();
      },
    });
  };

  useEffect(() => {
    const handler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (!isSelecting) return false;

      handleReset();

      return true;
    });

    return () => {
      handler.remove();
    };
  }, [isSelecting]);

  if (!data) return null;
  return (
    <ContainerView>
      <ScrollView>
        {data.map((video, index) => (
          <TouchableOpacity
            key={video.slug}
            onLongPress={() => {
              setIsSelecting(true);
              setSelectingSlugs([video.slug]);
            }}
            onPress={() => {
              if (isSelecting) {
                if (selectingSlugs.includes(video.slug)) {
                  setSelectingSlugs((prevState) =>
                    prevState.filter((slug) => slug !== video.slug)
                  );
                } else {
                  setSelectingSlugs((prevState) => [video.slug, ...prevState]);
                }
              } else {
                router.push({
                  pathname: "/video-player/[slug]",
                  params: {
                    slug: video.slug,
                    episodeSlug: video.episodeSlug,
                    serverName: video.serverName,
                  },
                });
              }
            }}
            style={[styles.video, { marginTop: index > 0 ? 10 : 0 }]}
          >
            {isSelecting && (
              <Checkbox value={selectingSlugs.includes(video.slug)} />
            )}
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
      </ScrollView>
      {isSelecting && (
        <View
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.SECONDARY,
            justifyContent: "center",
            gap: 10,
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <TouchableOpacity
            disabled={selectingSlugs.length === 0}
            onPress={handleDelete}
          >
            <MaterialIcons name="delete" size={24} color={colors.TEXT} />
            <Text style={utilStyles.text}>Xóa</Text>
          </TouchableOpacity>
        </View>
      )}
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingVertical: 12,
    color: colors.TEXT,
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
    ...utilStyles.text,
    padding: 2,
    flex: 1,
  },
});
