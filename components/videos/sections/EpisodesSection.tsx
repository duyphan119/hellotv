import { Episode, VideoServer } from "@/data/video";
import { globalStyles } from "@/utils/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type EpisodesSectionProps = {
  servers: VideoServer[];
  episode: Episode;
  server: VideoServer;
  onSelectServer: (server: VideoServer) => void;
  onSelectEpisode: (episode: Episode) => void;
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function EpisodesSection({
  servers,
  server: defaultServer,
  episode,
  onSelectEpisode,
  onSelectServer,
}: EpisodesSectionProps) {
  const [server, setServer] = useState<VideoServer | null>(defaultServer);

  return (
    <View style={{ padding: 10, gap: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={[globalStyles.text]}>Server:</Text>
        {servers.map((item) => {
          const isActive = server && item.name === server.name;
          return (
            <TouchableOpacity
              key={item.name}
              onPress={() => setServer(item)}
              style={{
                backgroundColor: isActive
                  ? globalStyles.textPrimary.color
                  : globalStyles.textBlue.color,
                padding: 8,
                borderRadius: 4,
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
            >
              {isActive && (
                <MaterialIcons
                  name="check"
                  color={globalStyles.text.color}
                  size={16}
                />
              )}
              <Text style={[globalStyles.text]}>
                {item.name.split(" (").pop()?.slice(0, -1)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={[globalStyles.text]}>Danh sách tập:</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {server?.episodes.map((item) => {
          const isActive = episode.filename === item.filename;
          return (
            <TouchableOpacity
              key={item.name}
              onPress={() => {
                onSelectEpisode(item);
                onSelectServer(server);
              }}
              style={{
                width: (SCREEN_WIDTH - 20 - 30) / 4,
                paddingBlock: 10,
                backgroundColor: isActive
                  ? globalStyles.textPrimary.color
                  : globalStyles.textBlue.color,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 5,
              }}
            >
              {isActive && (
                <MaterialIcons
                  name="check"
                  color={globalStyles.text.color}
                  size={14}
                />
              )}
              <Text style={[globalStyles.text]}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
