import ContainerView from "@/components/ContainerView";
import SearchFilter from "@/components/SearchFilter";
import SearchResults from "@/components/SearchResults";
import colors from "@/data/colors";
import { SearchVideosParams, VideosParams } from "@/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function TabSearch() {
  const [keyword, setKeyword] = useState<string>("");
  const [params, setParams] = useState<SearchVideosParams>({
    page: 1,
    limit: 18,
  });

  const handleFilter = (newParams: VideosParams) => {
    setParams(newParams);
  };

  return (
    <ContainerView>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Tìm kiếm tại đây"
          style={styles.textInput}
          placeholderTextColor={colors.DARK}
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
          autoFocus={true}
        />
        <TouchableOpacity>
          <MaterialIcons
            name="search"
            color={colors.TEXT}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      <SearchFilter params={params} onFilter={handleFilter} />
      {keyword && <SearchResults keyword={keyword} params={params} />}
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    borderWidth: 1,
    borderColor: colors.DARK,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    color: colors.TEXT,
    flex: 1,
  },
  searchIcon: {
    padding: 5,
    fontSize: 16,
  },
});
