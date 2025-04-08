import ContainerView from "@/components/ContainerView";
import Streaming from "@/components/Streaming";
import VideoDetails from "@/components/VideoDetails";
import VideoEpisodes from "@/components/VideoEpisodes";
import { VideoDetailsProvider } from "@/contexts/VideoDetailsContext";
import useGetVideo from "@/hooks/useGetVideo";
import { useVideoDetails } from "@/hooks/useVideoDetails";
import { useIsFocused } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

const Details = () => {
  const { currentServerData } = useVideoDetails();

  if (!currentServerData) return null;
  return (
    <>
      <Streaming source={currentServerData.link_m3u8} />
      <VideoDetails />
      <VideoEpisodes />
    </>
  );
};

export default function VideoSlug() {
  const isFocused = useIsFocused();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(isFocused);
  }, [isFocused]);

  const { video_slug, serverName, episodeSlug, ...params } =
    useLocalSearchParams();

  const { data } = useGetVideo({ slug: video_slug as string });

  if (!data || !open) return null;

  return (
    <ContainerView>
      <VideoDetailsProvider
        defaultCurrentTime={Number(params.currentTime)}
        serverName={String(serverName || "")}
        episodeSlug={String(episodeSlug || "")}
        isFocused={isFocused}
        {...data}
      >
        <Details />
      </VideoDetailsProvider>
    </ContainerView>
  );
}
