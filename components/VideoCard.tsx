import colors from "@/data/colors";
import { Image } from "expo-image";
import { useNavigation, useRouter } from "expo-router";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

type VideoCardProps = {
  source: string;
  name: string;
  slug: string;
};

export default function VideoCard({ name, source, slug }: VideoCardProps) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/video/[video_slug]",
          params: {
            video_slug: slug,
          },
        });
      }}
      style={styles.video}
    >
      <Image source={source} style={styles.videoImage} />
      <Text style={styles.videoName}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  video: {
    width: (Dimensions.get("window").width - 20) / 3,
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
