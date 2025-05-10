import { LatestVideo } from "@/data/video";
import useGetLatestVideos from "@/hooks/useGetLatestVideos";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function LatestVideosCarousel() {
  const { data, isLoading } = useGetLatestVideos();

  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const flatListRef = useRef<FlatList | null>(null);

  const videos = data?.pages.map(({ items }) => items).flat() || [];

  console.log(currentIndex);

  useEffect(() => {
    const intervalId = setInterval(() => {
      videos.length &&
        setCurrentIndex((prevState) => (prevState + 1) % videos.length);
    }, 6789);

    return () => {
      clearInterval(intervalId);
    };
  }, [videos]);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex]);

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
    <FlatList
      ref={flatListRef}
      data={videos}
      horizontal={true}
      getItemLayout={(item, index) => ({
        index,
        length: width,
        offset: width * index,
      })}
      renderItem={({ item, index }) => (
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
      style={styles.container}
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
  container: {
    height: (width * 9) / 16,
  },
  itemContainer: {
    position: "relative",
    width,
    height: (width * 9) / 16,
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
    width,
    height: (width * 9) / 16,
  },
  skeletonLoader: {
    margin: "auto",
  },
});
