import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

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
  const color = isActive ? "fuchsia" : "white";
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { borderColor: color }, style]}
    >
      <Text style={{ fontSize: 12, color }}>{title}</Text>
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
