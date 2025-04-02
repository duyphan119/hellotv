import ContainerView from "@/components/ContainerView";
import VideoCard from "@/components/VideoCard";
import colors from "@/data/colors";
import { getLatestVideos } from "@/hooks/useGetLatestVideos";
import { LatestVideosResponse } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";

export default function LatestVideos() {
  const { data, hasNextPage, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["videos"],
    initialPageParam: 1,
    getNextPageParam: (
      { pagination: { currentPage, totalPages } }: LatestVideosResponse,
      _
    ) => {
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    queryFn: ({ pageParam }) => {
      return getLatestVideos({ params: { page: pageParam } });
    },
  });

  if (!data) return null;
  return (
    <ContainerView>
      <Text style={[styles.colorText, styles.title]}>Phim bộ mới cập nhật</Text>
      <FlatList
        key={"videos"}
        numColumns={3}
        data={data.pages.map((page) => page.items).flat()}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ marginTop: 10, gap: 10 }}
        keyExtractor={(item, index) => index.toString() + item._id}
        renderItem={({ item: video }) => (
          <VideoCard
            slug={video.slug}
            name={video.name}
            source={video.poster_url}
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
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  colorText: { color: colors.WHITE },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
});
