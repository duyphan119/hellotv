import { Episode, VideoServer } from "@/data/video";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";

export type EpisodesProps = {
  servers: VideoServer[];
  episode: Episode;
  server: VideoServer;
  onSelectServer: (server: VideoServer) => void;
  onSelectEpisode: (episode: Episode) => void;
  thumbnail: string;
};

const { height: WINDOW_HEIGHT } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("screen");
const GAP = 10;
const WIDTH = 180;

export default function Episodes({
  servers,
  server: defaultServer,
  episode,
  onSelectEpisode,
  onSelectServer,
  thumbnail,
}: EpisodesProps) {
  const [server, setServer] = useState<VideoServer>(defaultServer);
  const flatListRef = useRef<FlatList | null>(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index:
          server.name === defaultServer.name
            ? defaultServer.episodes.findIndex(
                ({ filename }) => filename === episode.filename
              )
            : 0,
      });
    }
  }, [server]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: GAP }}>
        <Text style={{ color: "white" }}>Server:</Text>
        {servers.map((item) => {
          const isActive = server && item.name === server.name;
          return (
            <TouchableOpacity
              key={item.name}
              onPress={() => setServer(item)}
              style={{
                backgroundColor: isActive ? "fuchsia" : "gray",
                padding: 8,
                borderRadius: 4,
                flexDirection: "row",
                gap: GAP / 2,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 12, color: "white" }}>
                {item.name.split(" (").pop()?.slice(0, -1)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{
          gap: 5,
          paddingTop: 10,
          paddingBottom:
            SCREEN_HEIGHT - WINDOW_HEIGHT - (StatusBar.currentHeight || 0),
        }}
      >
        <Text style={{ color: "white" }}>Danh sách tập:</Text>

        <FlatList
          data={server.episodes}
          windowSize={10}
          ref={flatListRef}
          getItemLayout={(_, index) => ({
            index,
            length: (WIDTH * 9) / 16 + GAP,
            offset: ((WIDTH * 9) / 16 + GAP) * index,
          })}
          renderItem={({ item, index }) => {
            const isActive = item.filename === episode.filename;
            return (
              <TouchableOpacity
                onPress={() => {
                  onSelectEpisode(item);
                  onSelectServer(server);
                }}
                style={styles.episode}
              >
                <Image
                  source={{ uri: thumbnail }}
                  style={{ width: 180, aspectRatio: 16 / 9 }}
                />

                {isActive && (
                  <View style={styles.playing}>
                    <Text style={{ color: "white" }}>Đang phát</Text>
                  </View>
                )}
                <Text
                  style={{
                    color: isActive ? "fuchsia" : "white",
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.filename}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  episode: {
    marginTop: GAP,
    flexDirection: "row",
    alignItems: "center",
    gap: GAP,
    position: "relative",
  },
  playing: {
    position: "absolute",
    left: 0,
    top: 0,
    height: (180 * 9) / 16,
    justifyContent: "center",
    alignItems: "center",
    width: 180,
  },
});
