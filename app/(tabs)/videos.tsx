import SafeAreaView from "@/components/SafeAreaView";
import Videos from "@/components/Videos";
import VideosFilter from "@/components/VideosFilter";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export type VideosFilterParams = {
  typeList: string;
  categorySlug: string;
  countrySlug: string;
  year: string | number;
};

export default function TabVideos() {
  const params = useLocalSearchParams();

  const router = useRouter();

  const typeList = params?.typeList?.toString() || "phim-bo";
  const categorySlug = params?.categorySlug?.toString() || "";
  const countrySlug = params?.countrySlug?.toString() || "";
  const year = params?.year?.toString() || "";

  const handleFilter = (videosFilterParams: VideosFilterParams) => {
    router.setParams(videosFilterParams);
  };

  return (
    <SafeAreaView style={styles.container}>
      <VideosFilter
        typeList={typeList}
        categorySlug={categorySlug}
        countrySlug={countrySlug}
        year={year}
        onFilter={handleFilter}
      />
      <Videos
        filter={{
          typeList,
          categorySlug,
          countrySlug,
          year,
        }}
      />
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
