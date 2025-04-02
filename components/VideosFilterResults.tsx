import VideoCard from "@/components/VideoCard";
import colors from "@/data/colors";
import { TypeList } from "@/data/typeList";
import { useGetVideosByTypeInfinite } from "@/hooks/useGetVideosByType";
import { VideosParams } from "@/types";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

type VideosFilterResultsProps = {
  params: VideosParams;
  type: TypeList;
};

export default function VideosFilterResults({
  type,
  params,
}: VideosFilterResultsProps) {
  const {
    data: searchData,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetVideosByTypeInfinite({ type, params });

  if (!searchData) return null;
  return (
    <FlatList
      key={"videos_type_infinite"}
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
