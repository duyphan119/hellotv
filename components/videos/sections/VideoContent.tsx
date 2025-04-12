import { globalStyles } from "@/utils/styles";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type VideoContentProps = {
  content: string;
};

export default function VideoContent({ content }: VideoContentProps) {
  const splitedContent = content.split(" ");
  const [isMore, setIsMore] = useState<boolean>(splitedContent.length > 50);
  return (
    <Text style={[globalStyles.text]}>
      {isMore ? splitedContent.slice(0, 50).join(" ") : content}{" "}
      <Text
        onPress={() => setIsMore((prevState) => !prevState)}
        style={[
          globalStyles.text,
          {
            flexWrap: "wrap",
            textDecorationLine: "underline",
            fontWeight: 500,
          },
        ]}
      >
        {isMore ? "Xem thêm" : "Thu gọn"}
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({});
