import colors from "@/data/colors";
import useGetLatestVideos from "@/hooks/useGetLatestVideos";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const LatestVideoCarousel = () => {
  const router = useRouter();

  const { data } = useGetLatestVideos({});

  const scrollViewRef = useRef<ScrollView | null>(null);
  const scrollX = useRef<number>(0);
  const currentIndex = useRef<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (data) {
        currentIndex.current = (currentIndex.current + 1) % data.items.length;
        scrollX.current = currentIndex.current * width;
        scrollViewRef.current?.scrollTo({ x: scrollX.current, animated: true });
      }
    }, 4567);

    return () => clearInterval(interval);
  }, [data]);

  if (!data) return <View style={[styles.size]}></View>;

  return (
    <ScrollView
      style={styles.size}
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    >
      {data.items.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => {
            router.push({
              pathname: "/video-player/[slug]",
              params: {
                slug: item.slug,
              },
            });
          }}
          style={styles.imageWrapper}
        >
          <Image
            style={styles.image}
            source={item.thumb_url || item.poster_url}
            contentFit="cover"
            transition={1000}
          />
          <Text style={styles.latestVideoName}>{item.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default LatestVideoCarousel;

const styles = StyleSheet.create({
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width,
  },
  image: { height: "100%", width: "100%" },
  latestVideoName: {
    fontSize: 16,
    paddingInline: 10,
    paddingBlock: 6,
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: colors.BACKGROUND,
    color: colors.TEXT,
    opacity: 0.7,
  },
  size: {
    width,
    aspectRatio: 16 / 9,
  },
});
