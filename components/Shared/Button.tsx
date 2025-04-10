import colors from "@/data/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function Button({
  title,
  onPress,
  style = {},
  textStyle = {},
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: "row",
        },
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          {
            color: colors.TEXT,
            backgroundColor: colors.PRIMARY,

            paddingInline: 10,
            borderRadius: 5,
            fontSize: 16,
            paddingBlock: 6,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
