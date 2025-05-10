import { StatusBar, View, ViewStyle } from "react-native";

type SafeAreaViewProps = {
  children?: React.ReactNode;
  style?: ViewStyle;
};

export default function SafeAreaView({ children, style }: SafeAreaViewProps) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <View style={style}>{children}</View>
    </View>
  );
}
