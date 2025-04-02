import colors from "@/data/colors";
import { ScrollView, StyleSheet, View } from "react-native";

type ContainerViewProps = {
  children: React.ReactNode;
  scrollable?: boolean;
};

export default function ContainerView({
  children,
  scrollable,
}: ContainerViewProps) {
  if (scrollable)
    return <ScrollView style={styles.container}>{children}</ScrollView>;
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLACK,
  },
});
