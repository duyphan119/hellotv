import colors from "@/data/colors";
import { StyleSheet } from "react-native";

export const utilStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.BACKGROUND,
    flex: 1,
    position: "relative",
  },
  text: {
    color: colors.TEXT,
  },
});
