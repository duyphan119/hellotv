import ContainerView from "@/components/ContainerView";
import VideoCard from "@/components/VideoCard";
import colors from "@/data/colors";
import { TypeList } from "@/data/typeList";
import { getVideosByCategory } from "@/hooks/useGetVideosByCategory";
import { getVideosByCountry } from "@/hooks/useGetVideosByCountry";
import { getVideosByType } from "@/hooks/useGetVideosByType";
import { VideosResponse } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";

type VideosKeysProps = {
  videosKeys: string[];
};

export default function VideosKeys({ videosKeys }: VideosKeysProps) {
  console.log(videosKeys);
  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["videos"],
    initialPageParam: 1,
    getNextPageParam: (
      {
        params: {
          pagination: { currentPage, totalPages },
        },
      }: VideosResponse,
      _
    ) => {
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    queryFn: ({ pageParam }) => {
      const value = videosKeys[1] as string;
      if (videosKeys[0] === "quoc-gia") {
        return getVideosByCountry({
          countrySlug: value,
          params: { page: pageParam, limit: 24 },
        });
      } else if (videosKeys[0] === "the-loai") {
        return getVideosByCategory({
          categorySlug: value,
          params: { page: pageParam, limit: 24 },
        });
      }
      return getVideosByType({
        params: { page: pageParam, limit: 24 },
        type: value as TypeList,
      });
    },
  });

  if (!data) return null;
  return (
    <ContainerView>
      <Text style={[styles.colorText, styles.title]}>{videosKeys[2]}</Text>
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
            source={`${data.pages[0].APP_DOMAIN_CDN_IMAGE}/${video.poster_url}`}
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
  colorText: { color: colors.TEXT },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
});
