import { LatestVideo } from "@/data/video";
import { globalStyles } from "@/utils/styles";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { Dimensions, Image, Pressable, StyleSheet, Text } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type LatestVideosSectionProps = {
  videos: LatestVideo[];
};

export default function LatestVideosSection({
  videos,
}: LatestVideosSectionProps) {
  const router = useRouter();

  return (
    <Carousel
      loop
      autoPlay
      autoPlayInterval={5678}
      width={SCREEN_WIDTH}
      height={(SCREEN_WIDTH * 9) / 16}
      data={videos}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            router.push({
              pathname: "/video/[slug]",
              params: {
                slug: item.slug,
              },
            });
          }}
          style={{
            position: "relative",
          }}
        >
          <Image
            source={{ uri: item.thumbnail }}
            style={{ width: "100%", height: "100%" }}
          />
          <BlurView
            style={{
              position: "absolute",
              left: 10,
              right: 10,
              bottom: 10,
              padding: 10,
            }}
            intensity={70}
            tint="dark"
          >
            <Text style={[globalStyles.text]}>{item.name}</Text>
          </BlurView>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({});
