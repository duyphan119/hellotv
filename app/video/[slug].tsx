import EpisodesSection from "@/components/videos/sections/EpisodesSection";
import InfoSection from "@/components/videos/sections/InfoSection";
import PlayerSection, {
  PlayerSkeletonSection,
} from "@/components/videos/sections/PlayerSection";
import { Episode, VideoServer } from "@/data/video";
import { WatchedVideo } from "@/data/watchedVideo";
import useCreateWatchedVideo from "@/hooks/useCreateWatchedVideo";
import useGetVideo from "@/hooks/useGetVideo";
import useGetWatchedVideo from "@/hooks/useGetWatchedVideo";
import { globalStyles } from "@/utils/styles";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  AppState,
  BackHandler,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VideoSlug() {
  const params = useLocalSearchParams();

  const router = useRouter();

  const slugStr = params?.slug?.toString() || "";

  const { data: videoData } = useGetVideo(slugStr);
  const { data: watchedVideoData } = useGetWatchedVideo(slugStr);

  const { mutate: createWatchedVideo } = useCreateWatchedVideo();

  const queryClient = useQueryClient();

  const [server, setServer] = useState<VideoServer>();
  const [episode, setEpisode] = useState<Episode>();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const handlePlayToEnd = () => {
    if (server && episode) {
      const index = server.episodes.findIndex(
        (item) => item.name === episode.name
      );

      if (index === -1) return;

      const nextIndex = (index + 1) % server.episodes.length;

      if (!server.episodes[nextIndex]) return;

      setEpisode(server.episodes[nextIndex]);
    }
  };

  const handleSelectEpisode = (newEpisode: Episode) => {
    setEpisode(newEpisode);
    setCurrentTime(0);
    setDuration(0);
  };

  const handleCreateWatchedVideo = (
    inputs: WatchedVideo,
    onSuccess?: () => void
  ) => {
    createWatchedVideo(inputs, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["watchedVideos"] });
        queryClient.invalidateQueries({
          queryKey: ["watchedVideo", inputs.video.slug],
        });
        onSuccess?.();
      },
    });
  };

  useEffect(() => {
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
      const appState = AppState.addEventListener("change", (state) => {
        if (state !== "active") {
          handleCreateWatchedVideo(inputs);
        }
      });
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          handleCreateWatchedVideo(inputs, () => {
            router.canGoBack() && router.back();
          });
          return true;
        }
      );

      return () => {
        backHandler.remove();
        appState.remove();
      };
    }
  }, [episode, server, videoData, currentTime, duration]);

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

    if (watchedVideoData) {
      setCurrentTime(watchedVideoData.episode.currentTime);
    }
  }, [videoData, watchedVideoData]);

  if (!videoData)
    return (
      <SafeAreaView style={globalStyles.container}>
        <PlayerSkeletonSection />
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={[globalStyles.container]}>
      {episode ? (
        <PlayerSection
          source={episode.link_m3u8}
          currentTime={currentTime}
          onUpdateTime={setCurrentTime}
          setDuration={setDuration}
          onPlayToEnd={handlePlayToEnd}
        />
      ) : (
        <PlayerSkeletonSection />
      )}
      <ScrollView>
        {videoData.video ? <InfoSection video={videoData.video} /> : <></>}
        {episode && server && (
          <EpisodesSection
            servers={videoData.servers}
            server={server}
            episode={episode}
            onSelectServer={setServer}
            onSelectEpisode={handleSelectEpisode}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
