import { LatestVideo } from "@/data/video";
import useGetLatestVideos from "@/hooks/useGetLatestVideos";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function LatestVideosCarousel() {
  const router = useRouter();
  const { data, isLoading } = useGetLatestVideos();

  const handlePress = (item: LatestVideo) => {
    router.push({
      pathname: "/video/[slug]",
      params: {
        slug: item.slug,
      },
    });
  };

  if (!data || isLoading) return <LatestVideosSkeleton />;

  return (
    <Carousel
      loop
      autoPlay
      autoPlayInterval={5678}
      width={SCREEN_WIDTH}
      height={(SCREEN_WIDTH * 9) / 16}
      data={data.pages.map(({ items }) => items).flat()}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => handlePress(item)}
          style={styles.itemContainer}
        >
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
          <BlurView style={styles.nameContainer} intensity={70} tint="dark">
            <Text style={styles.name}>{item.name}</Text>
          </BlurView>
        </Pressable>
      )}
    />
  );
}

export function LatestVideosSkeleton() {
  return (
    <View style={styles.skeletonContainer}>
      <ActivityIndicator color="white" style={styles.skeletonLoader} />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    position: "relative",
  },
  image: { width: "100%", height: "100%" },
  nameContainer: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 10,
    padding: 10,
  },
  name: { color: "white" },
  skeletonContainer: {
    width: SCREEN_WIDTH,
    height: (SCREEN_WIDTH * 9) / 16,
  },
  skeletonLoader: {
    margin: "auto",
  },
});
