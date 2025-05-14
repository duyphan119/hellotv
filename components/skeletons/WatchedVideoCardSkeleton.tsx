import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type WatchedVideoCardSkeletonProps = {
  index?: number;
};

export default function WatchedVideoCardSkeleton({
  index = 0,
}: WatchedVideoCardSkeletonProps) {
  return (
    <View style={{ marginTop: index > 0 ? 10 : 0 }}>
      <View style={styles.image}>
        <ActivityIndicator color="white" style={styles.loader} />
      </View>
      <Text style={styles.transparentName}>Name</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: { width: "100%", aspectRatio: 16 / 9, borderRadius: 3 },
  loader: {
    margin: "auto",
  },
  transparentName: {
    color: "transparent",
    marginTop: 10,
  },
});
