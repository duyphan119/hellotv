import colors from "@/data/colors";
import useGetLatestVideos from "@/hooks/useGetLatestVideos";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const LatestVideoCarousel = () => {
  const router = useRouter();

  const { data } = useGetLatestVideos({});

  const width = Dimensions.get("window").width;

  if (!data) return <View style={styles.skeletonCarousel}></View>;

  return (
    <View>
      <Carousel
        loop
        width={width}
        height={(width * 9) / 16}
        autoPlay={true}
        autoPlayInterval={6000}
        data={data.items}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              router.push({
                pathname: "/video/[video_slug]",
                params: { video_slug: item.slug },
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
        )}
      />
    </View>
  );
};

export default LatestVideoCarousel;

const styles = StyleSheet.create({
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
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
    backgroundColor: colors.BLACK,
    color: colors.WHITE,
    opacity: 0.7,
  },
  skeletonCarousel: {
    width: Dimensions.get("window").width,
    aspectRatio: 9 / 16,
  },
});
