import EpisodesSection from "@/components/videos/sections/EpisodesSection";
import InfoSection from "@/components/videos/sections/InfoSection";
import PlayerSection, {
  PlayerSkeletonSection,
} from "@/components/videos/sections/PlayerSection";
import { Episode, VideoServer } from "@/data/video";
import { createWatchedVideo } from "@/data/watchedVideo";
import useCreateWatchedVideo from "@/hooks/useCreateWatchedVideo";
import useGetVideo from "@/hooks/useGetVideo";
import useGetWatchedVideo from "@/hooks/useGetWatchedVideo";
import { globalStyles } from "@/utils/styles";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VideoSlug() {
  const params = useLocalSearchParams();

  const slugStr = params?.slug?.toString() || "";
  const defaultTimeStr = params?.defaultTime?.toString() || "0";

  const { data: videoData, isLoading: videoDataIsLoading } =
    useGetVideo(slugStr);
  const { data: watchedVideoData } = useGetWatchedVideo(slugStr);

  const { mutate } = useCreateWatchedVideo();

  const queryClient = useQueryClient();

  const [server, setServer] = useState<VideoServer>();
  const [episode, setEpisode] = useState<Episode>();
  const [defaultTime, setDefaultTime] = useState<number>(+defaultTimeStr);

  const handleSelectEpisode = (newEpisode: Episode) => {
    setEpisode(newEpisode);
    setDefaultTime(0);
  };

  const handleSaveCurrentTime = (
    currentTime: number,
    duration: number,
    onSettled?: () => void
  ) => {
    if (episode && server && videoData && videoData.video) {
      const inputs = {
        episode: {
          currentTime,
          duration,
          name: episode.name,
          serverName: server.name,
        },
        time: new Date().getTime(),
        video: {
          name: videoData.video.name,
          poster: videoData.video.poster,
          thumbnail: videoData.video.thumbnail,
          slug: videoData.video.slug,
        },
      };
      mutate(inputs, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["watchedVideos"] });
          queryClient.invalidateQueries({
            queryKey: ["watchedVideo", inputs.video.slug],
          });
        },
        onSettled,
      });
    }
  };

  useEffect(() => {
    if (!videoData) return;

    const { servers } = videoData;

    let server: VideoServer | undefined = undefined;
    let episode: Episode | undefined = undefined;

    if (watchedVideoData) {
      server = servers.find(
        ({ name }) => name === watchedVideoData.episode.serverName
      );
    } else if (servers[0]) {
      server = servers[0];
    }

    if (!server) return;

    setServer(server);

    if (watchedVideoData) {
      episode = server.episodes.find(
        ({ name }) => name === watchedVideoData.episode.name
      );
    } else if (server.episodes[0]) {
      episode = server.episodes[0];
    }

    if (!episode) return;

    setEpisode(episode);
  }, [videoData, watchedVideoData]);

  useEffect(() => {
    setDefaultTime(+defaultTimeStr);
  }, [defaultTimeStr]);

  if (!videoData || videoDataIsLoading)
    return (
      <SafeAreaView style={globalStyles.container}>
        <PlayerSkeletonSection />
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={[globalStyles.container]}>
      {videoData.video && episode ? (
        <PlayerSection
          source={episode.link_m3u8}
          defaultTime={defaultTime}
          onSaveCurrentTime={handleSaveCurrentTime}
        />
      ) : (
        <PlayerSkeletonSection />
      )}
      <View style={{ padding: 10, gap: 10, flex: 1 }}>
        {videoData.video ? <InfoSection video={videoData.video} /> : <></>}
        {episode && server && (
          <EpisodesSection
            servers={videoData.servers}
            server={server}
            episode={episode}
            onSelectServer={setServer}
            onSelectEpisode={handleSelectEpisode}
            thumbnail={videoData.video?.thumbnail || ""}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
