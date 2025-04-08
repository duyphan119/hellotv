import { useCreateWatchingVideo } from "@/hooks/useCreateWatchingVideo";
import { useGetWatchingVideos } from "@/hooks/useGetWatchingVideos";
import { Episode, ServerData, Video } from "@/types";
import { defaultVideo } from "@/utils/defaultValues";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

type Data = {
  video: Video;
  episodes: Episode[];
};

type ComonProps = Data & {
  serverName: string;
  episodeSlug: string;
  currentEpisode?: Episode;
  currentServerData?: ServerData;
};
type VideoContextProps = ComonProps & {
  currentTime: number;
  isFocused: boolean;
  onChangeServerData: (serverData: ServerData) => void;
  setCurrentEpisode: (episode: Episode) => void;
  onPressNext: () => void;
  onPressPrevious: () => void;
  onSaveCurrentTime: (
    currentTime: number,
    duration: number,
    invalidateQueries: boolean
  ) => void;
};

const VideoDetailsContext = createContext<VideoContextProps>({
  video: defaultVideo,
  episodes: [],
  serverName: "",
  episodeSlug: "",
  currentTime: 0,
  isFocused: false,
  onChangeServerData: (serverData: ServerData) => {},
  setCurrentEpisode: (episode: Episode) => {},
  onPressNext: () => {},
  onPressPrevious: () => {},
  onSaveCurrentTime: (
    currentTime: number,
    duration: number,
    invalidateQueries: boolean
  ) => {},
});

type VideoDetailsProviderProps = ComonProps & {
  children: React.ReactNode;
  defaultCurrentTime: number;
  isFocused: boolean;
};

export const VideoDetailsProvider = ({
  children,
  video,
  episodes,
  episodeSlug,
  serverName,
  defaultCurrentTime,
  isFocused,
}: VideoDetailsProviderProps) => {
  const [currentEpisode, setCurrentEpisode] = useState<Episode>();
  const [currentServerData, setCurrentServerData] = useState<ServerData>();
  const [currentTime, setCurrentTime] = useState<number>(-1);

  const { data: watchingVideos } = useGetWatchingVideos();

  const queryClient = useQueryClient();

  const { mutate } = useCreateWatchingVideo();

  const saveCurrentTime = (
    currentTime: number,
    duration: number,
    invalidateQueries: boolean
  ) => {
    if (currentServerData && currentEpisode) {
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

  useEffect(() => {
    (async () => {
      const currentEp = serverName
        ? episodes.find((item) => item.server_name === serverName)
        : episodes?.[0];

      const currentSData =
        currentEp?.server_data.find((item) => item.slug === episodeSlug) ||
        currentEp?.server_data?.[0] ||
        undefined;

      setCurrentEpisode(currentEp);
      setCurrentServerData(currentSData);
    })();
  }, [episodes, serverName, episodeSlug]);

  useEffect(() => {
    if (defaultCurrentTime) {
      setCurrentTime(defaultCurrentTime);
    } else {
      if (currentEpisode && currentServerData && watchingVideos && video) {
        const index = watchingVideos.findIndex(
          (item) =>
            item.serverName === currentEpisode.server_name &&
            item.episodeSlug === currentServerData.slug &&
            item.slug === video.slug
        );
        const currentTime =
          index === -1 ? 0 : watchingVideos[index].currentTime;

        setCurrentTime(currentTime >= 0 ? currentTime : 0);
      }
    }
  }, [watchingVideos, currentEpisode, currentServerData, video]);

  const onChangeServerData = (serverData: ServerData) => {
    setCurrentServerData(serverData);
    setCurrentTime(0);
  };

  const handlePressNext = () => {
    if (currentEpisode && currentServerData) {
      const index = currentEpisode.server_data.findIndex(
        ({ filename }) => filename === currentServerData.filename
      );

      if (index === -1) return;

      const nextIndex = (index + 1) % currentEpisode.server_data.length;

      onChangeServerData(currentEpisode.server_data[nextIndex]);
    }
  };

  const handlePressPrevious = () => {
    if (currentEpisode && currentServerData) {
      const index = currentEpisode.server_data.findIndex(
        ({ filename }) => filename === currentServerData.filename
      );

      if (index === -1) return;

      const prevIndex =
        (index - 1 + currentEpisode.server_data.length) %
        currentEpisode.server_data.length;

      onChangeServerData(currentEpisode.server_data[prevIndex]);
    }
  };

  return (
    <VideoDetailsContext.Provider
      value={{
        video,
        episodeSlug,
        episodes,
        serverName,
        currentEpisode,
        currentServerData,
        currentTime,
        isFocused,
        onChangeServerData,
        setCurrentEpisode,
        onPressNext: handlePressNext,
        onPressPrevious: handlePressPrevious,
        onSaveCurrentTime: saveCurrentTime,
      }}
    >
      {children}
    </VideoDetailsContext.Provider>
  );
};

export default VideoDetailsContext;
