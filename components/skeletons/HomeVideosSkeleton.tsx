import { FlatList, StyleSheet, Text, View } from "react-native";
import VideoCardSkeletion from "./VideoCardSkeletion";

export default function HomeVideosSkeleton() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, color: "transparent" }}>title</Text>
      <FlatList
        scrollEnabled={false}
        numColumns={3}
        data={[1, 2, 3, 4, 5, 6]}
        renderItem={({ index }) => <VideoCardSkeletion index={index} />}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 10, padding: 10 },
  transparentTitle: { fontSize: 20, color: "transparent" },
});
