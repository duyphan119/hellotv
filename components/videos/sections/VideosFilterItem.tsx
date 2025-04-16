import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { globalStyles } from "@/utils/styles";

type VideosFilterItemProps = {
  style?: ViewStyle;
  title: string | number;
  isActive?: boolean;
  onPress?: () => void;
};

export default function VideosFilterItem({
  style,
  title,
  isActive,
  onPress,
}: VideosFilterItemProps) {
  const borderColor = isActive
    ? globalStyles.textPrimary.color
    : globalStyles.text.color;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { borderColor }, style]}
    >
      <Text
        style={[
          isActive ? globalStyles.textPrimary : globalStyles.text,
          { fontSize: 12 },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
});
