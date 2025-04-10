import colors from "@/data/colors";
import { Episode, ServerData } from "@/types";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type VideoEpisodesProps = {
  episodes: Episode[];
  episode: Episode;
  serverData: ServerData;
  onChangeServerData: (serverData: ServerData) => void;
  onChangeEpisode: (episode: Episode) => void;
};

export default function VideoEpisodes({
  episode,
  episodes,
  serverData,
  onChangeEpisode,
  onChangeServerData,
}: VideoEpisodesProps) {
  return (
    <>
      <View style={styles.serverContainer}>
        {episodes.map((ep, index) => {
          const isActive = ep.server_name === episode?.server_name;
          return (
            <TouchableOpacity
              key={ep.server_name}
              onPress={() => {
                onChangeEpisode(ep);
              }}
              style={{
                borderColor: colors.LIGHT,
                borderWidth: 1,
                padding: 4,
                borderRightWidth: index === 0 ? 0 : 1,
                backgroundColor: isActive ? colors.LIGHT : colors.DARK,
              }}
            >
              <Text
                style={{
                  color: isActive ? colors.DARK : colors.LIGHT,
                }}
              >
                {ep.server_name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {episode && serverData && (
        <FlatList
          style={styles.episodeContainer}
          numColumns={4}
          data={episode.server_data}
          renderItem={({ item, index }) => {
            const isActive = serverData.link_m3u8 === item.link_m3u8;
            return (
              <TouchableOpacity
                onPress={() => {
                  onChangeServerData(item);
                }}
                style={[
                  styles.buttonEpisode,
                  {
                    marginLeft: index % 4 !== 0 ? 10 : 0,
                    marginTop: index >= 4 ? 10 : 0,
                    backgroundColor: isActive ? colors.SUCCESS : colors.PRIMARY,
                  },
                ]}
              >
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.filename}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  serverContainer: { marginTop: 10, paddingInline: 10, flexDirection: "row" },
  episodeContainer: { padding: 10, borderWidth: 1, borderColor: colors.DARK },
  buttonEpisode: {
    width: SCREEN_WIDTH / 4 - 12,
    padding: 10,
    alignItems: "center",
    borderRadius: 2,
  },
  text: {
    color: colors.TEXT,
  },
});
