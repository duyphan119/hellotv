import colors from "@/data/colors";
import { VideosParams } from "@/types";
import { Link } from "expo-router";
import { Fragment } from "react";
import { StyleSheet, Text } from "react-native";

type VideoMetaItemProps = {
  label: string;
  name: string;
  index: number;
  params?: VideosParams;
};

export default function VideoMetaItem({
  name,
  index,
  label,
  params,
}: VideoMetaItemProps) {
  return (
    <Fragment>
      {index > 0 ? (
        <Text style={styles.colorText}>, </Text>
      ) : (
        <Text style={[styles.colorText, { fontWeight: "bold" }]}>
          {label}:{" "}
        </Text>
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
}

const styles = StyleSheet.create({
  colorText: { color: colors.TEXT },
});
