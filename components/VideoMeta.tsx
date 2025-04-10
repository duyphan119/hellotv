import colors from "@/data/colors";
import { ServerData, Video } from "@/types";
import { StyleSheet, Text, View } from "react-native";
import VideoMetaItem from "./VideoMetaItem";

type VideoMetaProps = {
  video: Video;
  serverData?: ServerData | null;
};

export default function VideoMeta({ video, serverData }: VideoMetaProps) {
  return (
    <View style={styles.videoInfoContainer}>
      <Text style={[styles.videoName, styles.colorText]}>
        {serverData?.filename || video.name}
      </Text>
      <View style={styles.videoRow}>
        {video.country.map(({ name, slug }, index) => (
          <VideoMetaItem
            key={name}
            name={name}
            label="Quốc gia"
            index={index}
            params={{ country: slug }}
          />
        ))}
      </View>
      <View style={styles.videoRow}>
        {video.category.map(({ name, slug }, index) => (
          <VideoMetaItem
            key={name}
            name={name}
            label="Thể loại"
            index={index}
            params={{ category: slug }}
          />
        ))}
      </View>
      <View style={styles.videoRow}>
        {video.actor.map((name, index) => (
          <VideoMetaItem
            key={name}
            name={name}
            label="Diễn viên"
            index={index}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  videoInfoContainer: { padding: 10 },
  videoName: { fontSize: 20 },
  videoRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 10,
  },
  colorText: { color: colors.TEXT },
});
