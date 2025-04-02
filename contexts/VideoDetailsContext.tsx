import { useGetWatchingVideos } from "@/hooks/useGetWatchingVideos";
import { Episode, ServerData, Video } from "@/types";
import { defaultVideo } from "@/utils/defaultValues";
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
  onChangeServerData: (serverData: ServerData) => void;
  currentTime: number;
  setCurrentEpisode: (episode: Episode) => void;
};

const VideoDetailsContext = createContext<VideoContextProps>({
  video: defaultVideo,
  episodes: [],
  serverName: "",
  episodeSlug: "",
  currentTime: 0,
  onChangeServerData: (serverData: ServerData) => {},
  setCurrentEpisode: (episode: Episode) => {},
});

type VideoDetailsProviderProps = ComonProps & {
  children: React.ReactNode;
  defaultCurrentTime: number;
};

export const VideoDetailsProvider = ({
  children,
  video,
  episodes,
  episodeSlug,
  serverName,
  defaultCurrentTime,
}: VideoDetailsProviderProps) => {
  const [currentEpisode, setCurrentEpisode] = useState<Episode>();
  const [currentServerData, setCurrentServerData] = useState<ServerData>();
  const [currentTime, setCurrentTime] = useState<number>(-1);

  const { data: watchingVideos } = useGetWatchingVideos();

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
        onChangeServerData,
        setCurrentEpisode,
      }}
    >
      {children}
    </VideoDetailsContext.Provider>
  );
};

export default VideoDetailsContext;
