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
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          padding: 5,
          borderWidth: 1,
          borderColor: isActive
            ? globalStyles.textPrimary.color
            : globalStyles.text.color,
          borderRadius: 10,
        },
        style,
      ]}
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

const styles = StyleSheet.create({});
