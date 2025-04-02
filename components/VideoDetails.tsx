import { StyleSheet, Text, View } from "react-native";
import React, { Fragment } from "react";
import colors from "@/data/colors";
import { Video, VideosParams } from "@/types";
import { Link } from "expo-router";
import { useVideoDetails } from "@/hooks/useVideoDetails";

type NameProps = {
  label: string;
  name: string;
  index: number;
  params?: VideosParams;
};

const Name = ({ name, index, label, params }: NameProps) => (
  <Fragment>
    {index > 0 ? (
      <Text style={styles.colorText}>, </Text>
    ) : (
      <Text style={[styles.colorText, { fontWeight: "bold" }]}>{label}: </Text>
    )}
    {params ? (
      <Link
        href={{
          pathname: "/(tabs)/[videos_params]",
          params: { videos_params: JSON.stringify(params) },
        }}
        style={styles.colorText}
      >
        {name}
      </Link>
    ) : (
      <Text style={styles.colorText}>{name}</Text>
    )}
  </Fragment>
);

export default function VideoDetails() {
  const { video, currentServerData } = useVideoDetails();
  return (
    <View style={styles.videoInfoContainer}>
      <Text style={[styles.videoName, styles.colorText]}>
        {currentServerData?.filename}
      </Text>
      <View style={styles.videoRow}>
        {video.country.map(({ name, slug }, index) => (
          <Name
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
          <Name
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
          <Name key={name} name={name} label="Diễn viên" index={index} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  videoInfoContainer: { padding: 10 },
  videoName: { fontSize: 20 },
  colorText: { color: colors.WHITE },
  videoRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 10,
  },
});
