import ContainerView from "@/components/ContainerView";
import Streaming from "@/components/Streaming";
import VideoDetails from "@/components/VideoDetails";
import VideoEpisode from "@/components/VideoEpisode";
import { VideoDetailsProvider } from "@/contexts/VideoDetailsContext";
import { useCreateWatchingVideo } from "@/hooks/useCreateWatchingVideo";
import useGetVideo from "@/hooks/useGetVideo";
import { useVideoDetails } from "@/hooks/useVideoDetails";
import { useIsFocused } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

const Details = () => {
  const { video, currentServerData, currentEpisode } = useVideoDetails();

  const queryClient = useQueryClient();

  const { mutate } = useCreateWatchingVideo();

  const saveCurrentTime = async (
    currentTime: number,
    duration: number,
    invalidateQueries: boolean
  ) => {
    if (currentServerData && currentEpisode) {
      console.log("save", currentTime, duration);
      mutate(
        {
          currentTime,
          duration,
          serverName: currentEpisode.server_name,
          posterUrl: video.poster_url,
          thumbnailUrl: video.thumb_url,
          name: video.name,
          slug: video.slug,
          episodeSlug: currentServerData.slug,
          time: new Date().getTime(),
        },
        {
          onSuccess() {
            if (invalidateQueries) {
              queryClient.invalidateQueries({ queryKey: ["watching-videos"] });
            }
          },
        }
      );
    }
  };

  if (!currentServerData) return null;
  return (
    <>
      <Streaming
        source={currentServerData.link_m3u8}
        onSaveCurrentTime={saveCurrentTime}
        slug={video.slug}
      />
      <VideoDetails />
      <VideoEpisode videoSlug={video.slug} videoThumbnail={video.thumb_url} />
    </>
  );
};

export default function VideoSlug() {
  const isFocused = useIsFocused();

  const { video_slug, serverName, episodeSlug, ...params } =
    useLocalSearchParams();

  const { data } = useGetVideo({ slug: video_slug as string });

  if (!isFocused || !data) return null;

  return (
    <ContainerView>
      <VideoDetailsProvider
        defaultCurrentTime={Number(params.currentTime)}
        serverName={String(serverName || "")}
        episodeSlug={String(episodeSlug || "")}
        {...data}
      >
        <Details />
      </VideoDetailsProvider>
    </ContainerView>
  );
}
