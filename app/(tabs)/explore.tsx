import VideoCard from "@/components/videos/sections/VideoCard";
import VideosFilterSection from "@/components/videos/sections/VideosFilterSection";
import useSearchVideos from "@/hooks/useSearchVideos";
import { globalStyles } from "@/utils/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useDebounce } from "@uidotdev/usehooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VideosFilter } from "./videos";

export default function Explore() {
  const [text, setText] = useState<string>("conan");

  const [debouncedText] = useDebounce([text], 345);

  const textInputRef = useRef<TextInput | null>(null);

  const params = useLocalSearchParams();

  const router = useRouter();

  const categorySlug = params?.categorySlug?.toString() || "";
  const countrySlug = params?.countrySlug?.toString() || "";
  const year = params?.year?.toString() || "";

  const { data, hasNextPage, fetchNextPage } = useSearchVideos({
    category: categorySlug,
    country: countrySlug,
    year,
    keyword: debouncedText,
  });

  const handleFilter = (newFilter: VideosFilter) => {
    router.setParams(newFilter);
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        if (textInputRef.current) {
          textInputRef.current.blur();
        }
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <View
        style={{
          borderWidth: 1,
          borderColor: globalStyles.textSecondary.color,
          borderRadius: 4,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          ref={textInputRef}
          value={text}
          onChangeText={setText}
          placeholderTextColor={globalStyles.textSecondary.color}
          placeholder="Tìm kiếm..."
          style={[globalStyles.text, { flex: 1 }]}
        />
        {text !== "" && (
          <TouchableOpacity onPress={() => setText("")} style={{ padding: 5 }}>
            <MaterialIcons
              name="close"
              size={16}
              color={globalStyles.textSecondary.color}
            />
          </TouchableOpacity>
        )}
        <MaterialIcons
          name="search"
          size={24}
          color={globalStyles.textSecondary.color}
        />
      </View>
      <VideosFilterSection
        hideTypeListFilter={true}
        typeList={""}
        categorySlug={categorySlug}
        countrySlug={countrySlug}
        year={year}
        onFilter={handleFilter}
      />
      {data && (
        <FlatList
          numColumns={3}
          data={data.pages.map(({ items }) => items).flat()}
          renderItem={({ item: video, index }) => (
            <VideoCard numColumns={3} video={video} index={index} />
          )}
          onEndReached={() => {
            hasNextPage && fetchNextPage();
          }}
          ListFooterComponent={() =>
            hasNextPage && (
              <View style={{ alignItems: "center" }}>
                <ActivityIndicator size={28} color={globalStyles.text.color} />
              </View>
            )
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
