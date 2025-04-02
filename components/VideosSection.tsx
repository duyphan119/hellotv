import colors from "@/data/colors";
import { Video, VideosParams, VideosResponse } from "@/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type VideosSectionProps = {
  title: string;
  videos: Video[];
  domainCdnImage?: string;
  params: VideosParams;
};

export default function VideosSection({
  title,
  videos,
  domainCdnImage = "",
  params,
}: VideosSectionProps) {
  const router = useRouter();

  return (
    <View>
      {title && (
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/(tabs)/[videos_params]",
              params: {
                videos_params: JSON.stringify(params),
              },
            });
          }}
        >
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{title}</Text>
            <MaterialIcons name="chevron-right" style={styles.titleIcon} />
          </View>
        </TouchableOpacity>
      )}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.videos}
      >
        {videos.map((video, index) => (
          <TouchableOpacity
            key={video._id}
            onPress={() => {
              router.push({
                pathname: "/(tabs)/video/[video_slug]",
                params: { video_slug: video.slug },
              });
            }}
            style={[styles.video, { marginLeft: index > 0 ? 10 : 0 }]}
          >
            <Image
              source={
                domainCdnImage
                  ? `${domainCdnImage}/${video.poster_url}`
                  : video.poster_url
              }
              style={styles.videoImage}
            />
            <Text style={styles.videoName}>{video.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  title: {
    fontSize: 20,
    paddingVertical: 12,
    color: colors.WHITE,
    paddingInline: 5,
  },
  titleIcon: {
    fontSize: 18,
    color: colors.WHITE,
  },
  videos: {
    flexDirection: "row",
  },
  video: {
    width: Dimensions.get("window").width / 4 - 10,
  },
  videoImage: {
    width: "100%",
    aspectRatio: 3 / 4,
  },
  videoName: {
    color: colors.WHITE,
    padding: 2,
  },
});
