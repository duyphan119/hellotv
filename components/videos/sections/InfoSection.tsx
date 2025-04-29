import { Video } from "@/data/video";
import { globalStyles } from "@/utils/styles";
import { Link } from "expo-router";
import { Fragment } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import VideoContent from "./VideoContent";

export type InfoSectionProps = {
  video: Video;
};

export default function InfoSection({ video }: InfoSectionProps) {
  return (
    <View>
      <View style={{ gap: 10 }}>
        <View>
          <Text style={[globalStyles.text, { fontSize: 16 }]}>
            {video.name}
          </Text>
          <Text style={[globalStyles.textSecondary, { fontSize: 12 }]}>
            {video.originName}
          </Text>
        </View>
        <VideoContent content={video.content} />
        <View>
          <Text style={styles.text}>Đạo diễn: {video.director}</Text>
          <Text style={styles.text}>Năm: {video.year}</Text>
          <Text style={styles.text}>
            Quốc gia:{" "}
            {video.countries.map(({ name, slug }, index) => (
              <Fragment key={name}>
                {index > 0 ? ", " : ""}
                <Link href="/" style={{ fontSize: 12 }}>
                  {name}
                </Link>
              </Fragment>
            ))}
          </Text>
          <Text style={styles.text}>
            Thể loại:{" "}
            {video.categories.map(({ name, slug }, index) => (
              <Fragment key={name}>
                {index > 0 ? ", " : ""}
                <Link href="/" style={{ fontSize: 12 }}>
                  {name}
                </Link>
              </Fragment>
            ))}
          </Text>
          <Text style={styles.text}>
            Diễn viên: {video.actors.slice(0, 5).join(", ")}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    ...globalStyles.text,
    fontSize: 12,
  },
});
