import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";

type VideoCardSkeletionProps = {
  index?: number;
  numColumns?: number;
};
const { width } = Dimensions.get("window");

export default function VideoCardSkeletion({
  index = 0,
  numColumns = 3,
}: VideoCardSkeletionProps) {
  const gapItems = (numColumns - 1) * 10;
  const paddingInline = 2 * 10;

  return (
    <View
      style={{
        width: (width - paddingInline - gapItems) / numColumns,
        marginLeft: index % numColumns !== 0 ? 10 : 0,
        marginTop: index >= numColumns ? 10 : 0,
      }}
    >
      <BlurView style={styles.imageContainer}>
        <ActivityIndicator style={styles.loader} color="white" />
      </BlurView>
      <Text style={[styles.videoName]}>Name</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 9 / 16,
    borderRadius: 2,
  },
  loader: { margin: "auto" },
  videoName: {
    color: "transparent",
    marginTop: 5,
  },
});
