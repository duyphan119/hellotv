import VideoCard from "@/components/videos/sections/VideoCard";
import VideosFilterSection from "@/components/videos/sections/VideosFilterSection";
import useGetVideosFilterResults from "@/hooks/useGetVideosFilterResults";
import { globalStyles } from "@/utils/styles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type VideosFilter = {
  typeList: string;
  categorySlug: string;
  countrySlug: string;
  year: string | number;
};

export default function Videos() {
  const params = useLocalSearchParams();

  const router = useRouter();

  const typeList = params?.typeList?.toString() || "phim-bo";
  const categorySlug = params?.categorySlug?.toString() || "";
  const countrySlug = params?.countrySlug?.toString() || "";
  const year = params?.year?.toString() || "";

  const { data, hasNextPage, fetchNextPage } = useGetVideosFilterResults({
    typeList,
    categorySlug,
    countrySlug,
    year,
  });

  const handleFilter = (newFilter: VideosFilter) => {
    router.setParams(newFilter);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <VideosFilterSection
        typeList={typeList}
        categorySlug={categorySlug}
        countrySlug={countrySlug}
        year={year}
        onFilter={handleFilter}
      />
      {data && (
        <FlatList
          style={{ padding: 10 }}
          data={data.pages.map(({ items }) => items).flat()}
          numColumns={3}
          renderItem={({ item: video, index }) => (
            <VideoCard video={video} index={index} />
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
