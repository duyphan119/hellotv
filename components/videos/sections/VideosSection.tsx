import { LatestVideo } from "@/data/video";
import { globalStyles } from "@/utils/styles";
import { Href, Link } from "expo-router";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";
import VideoCard from "./VideoCard";

type VideosSectionProps = {
  title: string;
  href: Href;
  videos: LatestVideo[];
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function VideosSection({
  title,
  href,
  videos,
}: VideosSectionProps) {
  return (
    <View style={{ gap: 10, padding: 10 }}>
      <Link href={href} style={[globalStyles.text, { fontSize: 20 }]}>
        {title}
      </Link>
      <FlatList
        scrollEnabled={false}
        numColumns={3}
        data={videos}
        renderItem={({ item: video, index }) => (
          <VideoCard video={video} index={index} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
