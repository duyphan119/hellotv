import LatestVideos from "@/components/LatestVideos";
import SafeAreaView from "@/components/SafeAreaView";
import SearchResults from "@/components/SearchResults";
import VideosFilter from "@/components/VideosFilter";
import { useDebounce } from "@uidotdev/usehooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { VideosFilterParams } from "./videos";

export default function TabExplore() {
  const [text, setText] = useState<string>("");

  const [debouncedText] = useDebounce([text], 345);
  const textInputRef = useRef<TextInput | null>(null);

  const params = useLocalSearchParams();

  const router = useRouter();

  const categorySlug = params?.categorySlug?.toString() || "";
  const countrySlug = params?.countrySlug?.toString() || "";
  const year = params?.year?.toString() || "";

  const handleFilter = (videosFilterParams: VideosFilterParams) => {
    router.setParams(videosFilterParams);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          ref={textInputRef}
          placeholder="Tìm kiếm phim"
          placeholderTextColor="gray"
          inputMode="search"
          onChangeText={setText}
          style={styles.textInput}
        />
      </View>
      <VideosFilter
        hideTypeListFilter={true}
        typeList={""}
        categorySlug={categorySlug}
        countrySlug={countrySlug}
        year={year}
        onFilter={handleFilter}
      />
      {debouncedText !== "" ? (
        <SearchResults
          params={{
            category: categorySlug,
            country: countrySlug,
            year,
            keyword: debouncedText,
            limit: 12,
          }}
        />
      ) : (
        <LatestVideos />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, position: "relative", flex: 1, gap: 10 },
  textInputContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  textInput: {
    color: "lightgray",
  },
});
