import { Episode, Video, VideoServer } from "@/data/video";
import { WatchedVideo } from "@/data/watchedVideo";
import useCreateWatchedVideo from "@/hooks/useCreateWatchedVideo";
import useDeleteWatchedVideo from "@/hooks/useDeleteWatchedVideo";
import { useIsFullscreen } from "@/hooks/useIsFullscreen";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Episodes from "./Episodes";
import VideoContent from "./VideoContent";
import VideoPlayer from "./VideoPlayer";

type VideoDetailsProps = {
  video: Video;
  servers: VideoServer[];
  watchedVideo?: WatchedVideo | null;
};

export default function VideoDetails({
  servers,
  video,
  watchedVideo,
}: VideoDetailsProps) {
  const [episode, setEpisode] = useState<Episode>();
  const [server, setServer] = useState<VideoServer>();
  const [defaultTime, setDefaultTime] = useState<number>(-1);

  const { mutate: createWatchedVideo } = useCreateWatchedVideo(video.slug);
  const { mutate: deleteWatchedVideo } = useDeleteWatchedVideo(video.slug);

  const { isFullscreen } = useIsFullscreen();

  const handleNext = () => {
    if (!episode) return;

    const server = servers.find(
      (server) =>
        server.episodes.findIndex(
          (item) => item.filename === episode.filename
        ) !== -1
    );

    if (!server) return;

    const index = server.episodes.findIndex(
      (item) => item.filename === episode.filename
    );

    if (index === -1) return;

    const nextEpisode = server.episodes[(index + 1) % server.episodes.length];

    setEpisode(nextEpisode);
    setDefaultTime(0);
  };

  const handlePrevious = () => {
    if (!episode) return;

    const server = servers.find(
      (server) =>
        server.episodes.findIndex(
          (item) => item.filename === episode.filename
        ) !== -1
    );

    if (!server) return;

    const index = server.episodes.findIndex(
      (item) => item.filename === episode.filename
    );

    if (index === -1) return;

    const previousEpisode =
      server.episodes[
        (index - 1 + server.episodes.length) % server.episodes.length
      ];

    setEpisode(previousEpisode);
    setDefaultTime(0);
  };

  useEffect(() => {
    let ep: Episode | undefined = undefined;
    let ser: VideoServer | undefined = undefined;

    if (watchedVideo) {
      ser = servers.find(
        (item) => item.name === watchedVideo.episode.serverName
      );
    } else {
      ser = servers[0];
    }
    if (!ser) return;

    setServer(ser);

    if (watchedVideo) {
      ep = ser.episodes.find((item) => item.name === watchedVideo.episode.name);
    } else {
      ep = ser.episodes[0];
    }

    if (!ep) return;

    setEpisode(ep);

    setDefaultTime(watchedVideo?.episode.currentTime || 0);
  }, [watchedVideo, video, servers]);

  const handleSelectEpisode = (episode: Episode) => {
    setEpisode(episode);
    setDefaultTime(0);
  };

  const handleSave = (currentTime: number, duration: number) => {
    if (!episode || !server) return;
    createWatchedVideo({
      episode: {
        name: episode.name,
        serverName: server.name,
        duration,
        currentTime,
      },
      time: new Date().getTime(),
      video: {
        name: video.name,
        poster: video.poster,
        slug: video.slug,
        thumbnail: video.thumbnail,
      },
    });
  };

  if (!server || !episode || defaultTime < 0) return null;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <VideoPlayer
        source={episode.link_m3u8}
        onNext={handleNext}
        onPrevious={handlePrevious}
        defaultTime={defaultTime}
        title={isFullscreen ? episode.filename : episode.name}
        onSave={handleSave}
        onDelete={deleteWatchedVideo}
      />
      {!isFullscreen && (
        <View style={{ padding: 10, flex: 1 }}>
          <View style={{ gap: 5 }}>
            <View>
              <Text style={{ color: "white", fontSize: 18 }}>{video.name}</Text>
              <Text style={{ color: "lightgray", fontSize: 12 }}>
                {video.originName}
              </Text>
            </View>
            <VideoContent content={video.content} />

            <View>
              <Text style={{ color: "white", fontSize: 12 }}>
                Đạo diễn: {video.director}
              </Text>
              <Text style={{ color: "white", fontSize: 12 }}>
                Quốc gia: {video.countries.map(({ name }) => name).join(", ")}
              </Text>
              <Text style={{ color: "white", fontSize: 12 }}>
                Thể loại: {video.categories.map(({ name }) => name).join(", ")}
              </Text>
              <Text style={{ color: "white", fontSize: 12 }}>
                Diễn viên: {video.actors.slice(0, 5).join(", ")}
              </Text>
              <Text style={{ color: "white", fontSize: 12 }}>
                Năm: {video.year}
              </Text>
            </View>
          </View>
          <Episodes
            servers={servers}
            server={server}
            episode={episode}
            onSelectServer={setServer}
            onSelectEpisode={handleSelectEpisode}
            thumbnail={video.thumbnail}
          />
        </View>
      )}
    </View>
  );
}
