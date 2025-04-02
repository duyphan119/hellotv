import VideoCard from "@/components/VideoCard";
import colors from "@/data/colors";
import useSearch from "@/hooks/useSearch";
import { SearchVideosParams } from "@/types";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

type SearchResultsProps = {
  keyword: string;
  params: SearchVideosParams;
};

export default function SearchResults({ keyword, params }: SearchResultsProps) {
  const {
    data: searchData,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useSearch({ keyword, params });

  if (!searchData) return null;
  return (
    <FlatList
      key={"searchResults"}
      numColumns={3}
      data={searchData.pages.map((page) => page.items).flat()}
      columnWrapperStyle={{ gap: 10 }}
      contentContainerStyle={{ marginTop: 10, gap: 10 }}
      keyExtractor={(item, index) => item._id + index.toString()}
      renderItem={({ item: video }) => (
        <VideoCard
          slug={video.slug}
          name={video.name}
          source={`${searchData.pages[0].APP_DOMAIN_CDN_IMAGE}/${video.poster_url}`}
        />
      )}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.8}
      ListFooterComponent={() =>
        isLoading ? (
          <ActivityIndicator
            color={colors.PRIMARY}
            style={{ marginBlock: 10 }}
          />
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({});
