import colors from "@/data/colors";
import { useVideoDetails } from "@/hooks/useVideoDetails";
import {
  Button,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type VideoEpisodeProps = {
  videoSlug: string;
  videoThumbnail: string;
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function VideoEpisode({
  videoSlug,
  videoThumbnail,
}: VideoEpisodeProps) {
  const {
    currentEpisode,
    currentServerData,
    onChangeServerData,
    setCurrentEpisode,
    episodes,
  } = useVideoDetails();

  if (!currentEpisode) return null;

  return (
    <>
      <View style={styles.serverContainer}>
        {episodes.map((ep, index) => {
          const isActive = ep.server_name === currentEpisode?.server_name;
          return (
            <TouchableOpacity
              key={ep.server_name}
              onPress={() => {
                setCurrentEpisode(ep);
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
      {currentServerData && (
        <FlatList
          style={styles.episodeContainer}
          numColumns={4}
          data={currentEpisode.server_data}
          renderItem={({ item, index }) => {
            const isActive = currentServerData.link_m3u8 === item.link_m3u8;
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
    color: colors.WHITE,
  },
});
