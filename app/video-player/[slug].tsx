import VideoEpisodes from "@/components/VideoEpisodes";
import VideoMeta from "@/components/VideoMeta";
import VideoPlayer from "@/components/VideoPlayer";
import colors from "@/data/colors";
import { useCreateWatchingVideo } from "@/hooks/useCreateWatchingVideo";
import useGetVideo from "@/hooks/useGetVideo";
import { useGetWatchingVideos } from "@/hooks/useGetWatchingVideos";
import { Episode, ServerData } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { AppState, BackHandler, View } from "react-native";

export default function ModalVideoPlayer() {
  const router = useRouter();

  const params = useLocalSearchParams();

  const { data } = useGetVideo({ slug: params.slug + "" });

  const { data: watchingVideos } = useGetWatchingVideos();

  const [episode, setEpisode] = useState<Episode | null>(null);
  const [serverData, setServerData] = useState<ServerData | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const queryClient = useQueryClient();

  const { mutate } = useCreateWatchingVideo();

  useEffect(() => {
    if (!data || !watchingVideos) return;

    const index = watchingVideos.findIndex(
      (item) => item.slug === data.video.slug
    );

    const watchingVideo = watchingVideos[index];
    const currentTime = params?.currentTime
      ? +params.currentTime
      : watchingVideo?.currentTime ?? 0;

    setCurrentTime(currentTime >= 0 ? currentTime : 0);

    const serverName =
      index === -1 ? params.serverName : watchingVideo?.serverName;
    const episodeSlug =
      index === -1 ? params.episodeSlug : watchingVideo?.episodeSlug;

    const currentEp = serverName
      ? data.episodes.find((ep) => ep.server_name === serverName)
      : data.episodes?.[0];

    const currentSData =
      currentEp?.server_data.find((s) => s.slug === episodeSlug) ||
      currentEp?.server_data?.[0];

    currentEp && setEpisode(currentEp);
    currentSData && setServerData(currentSData);
  }, [watchingVideos, data, params]);

  const handleChangeNextServerData = () => {
    if (episode && serverData) {
      const index = episode.server_data.findIndex(
        ({ filename }) => filename === serverData.filename
      );

      if (index !== -1) {
        const nextIndex = (index + 1) % episode.server_data.length;

        setServerData(episode.server_data[nextIndex]);
      }
    }
  };

  const handleChangePreviousServerData = () => {
    if (episode && serverData) {
      const index = episode.server_data.findIndex(
        ({ filename }) => filename === serverData.filename
      );

      if (index !== -1) {
        const previousIndex =
          (index - 1 + episode.server_data.length) % episode.server_data.length;

        setServerData(episode.server_data[previousIndex]);
      }
    }
  };

  const handleCreateWatchingVideo = (props?: { onSuccess?: () => void }) => {
    if (data && serverData) {
      const serverName = data.episodes.find(
        (episode) =>
          episode.server_data.findIndex(
            ({ filename }) => filename === serverData.filename
          ) !== -1
      )?.server_name;
      if (serverName) {
        mutate(
          {
            currentTime,
            duration,
            time: new Date().getTime(),
            thumbnailUrl: data.video.thumb_url,
            posterUrl: data.video.poster_url,
            name: data.video.name,
            slug: data.video.slug,
            episodeSlug: serverData.slug,
            serverName,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ["watching-videos"],
              });
              props?.onSuccess?.();
            },
            onError: (error) => {
              console.log(error);
            },
          }
        );
      }
    }
  };

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState !== "active") {
        handleCreateWatchingVideo();
      }

      appState.current = nextAppState;
    });

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        handleCreateWatchingVideo({
          onSuccess: () => {
            router.canGoBack() && router.back();
          },
        });

        return true;
      }
    );

    return () => {
      subscription.remove();
      backHandler.remove();
    };
  }, [data, serverData, currentTime, duration]);

  if (!data) return null;

  return (
    <View style={{ backgroundColor: colors.BACKGROUND, flex: 1 }}>
      {episode && serverData && (
        <VideoPlayer
          currentTime={currentTime}
          episode={episode}
          serverData={serverData}
          video={data.video}
          onChangeNextServerData={handleChangeNextServerData}
          onChangePreviousServerData={handleChangePreviousServerData}
          setCurrentTime={setCurrentTime}
          setDuration={setDuration}
        />
      )}
      {data.video && <VideoMeta video={data.video} serverData={serverData} />}
      {episode && serverData && (
        <VideoEpisodes
          episode={episode}
          serverData={serverData}
          episodes={data.episodes}
          onChangeEpisode={setEpisode}
          onChangeServerData={setServerData}
        />
      )}
    </View>
  );
}
