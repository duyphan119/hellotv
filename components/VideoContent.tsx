import { useState } from "react";
import { StyleSheet, Text } from "react-native";

type VideoContentProps = {
  content: string;
};

export default function VideoContent({ content }: VideoContentProps) {
  const splitedContent = content.split(" ");

  const visible = splitedContent.length > 50;

  const [isMore, setIsMore] = useState<boolean>(visible);

  return (
    <Text style={{ color: "white" }}>
      {isMore ? splitedContent.slice(0, 50).join(" ") : content}{" "}
      {visible && (
        <Text
          onPress={() => setIsMore((prevState) => !prevState)}
          style={{
            flexWrap: "wrap",
            textDecorationLine: "underline",
            fontWeight: 500,
            color: "fuchsia",
          }}
        >
          {isMore ? "Xem thêm" : "Thu gọn"}
        </Text>
      )}
    </Text>
  );
}

const styles = StyleSheet.create({});
