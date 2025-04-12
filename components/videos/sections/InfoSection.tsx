import { Video } from "@/data/video";
import { globalStyles } from "@/utils/styles";
import { Link } from "expo-router";
import { Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";
import VideoContent from "./VideoContent";

type InfoSectionProps = {
  video: Video;
};

export default function InfoSection({ video }: InfoSectionProps) {
  console.log(video);
  return (
    <View style={{ padding: 10, gap: 10 }}>
      <View>
        <Text style={[globalStyles.text, { fontSize: 20 }]}>{video.name}</Text>
        <Text style={[globalStyles.textSecondary]}>{video.originName}</Text>
      </View>
      <View style={{ gap: 10 }}>
        <Text style={[globalStyles.text]}>Đạo diễn: {video.director}</Text>
        <Text style={[globalStyles.text]}>
          Quốc gia:{" "}
          {video.countries.map(({ name, slug }, index) => (
            <Fragment key={name}>
              {index > 0 ? ", " : ""}
              <Link href="/">{name}</Link>
            </Fragment>
          ))}
        </Text>
        <Text style={[globalStyles.text]}>
          Thể loại:{" "}
          {video.categories.map(({ name, slug }, index) => (
            <Fragment key={name}>
              {index > 0 ? ", " : ""}
              <Link href="/">{name}</Link>
            </Fragment>
          ))}
        </Text>
        <VideoContent content={video.content} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
