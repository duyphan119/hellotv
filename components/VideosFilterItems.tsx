import colors from "@/data/colors";
import { VideosParams } from "@/types";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

type Key = keyof VideosParams;

type VideosFilterItemsProps = {
  onFilter: (params: VideosParams) => void;
  params: VideosParams;
  items: { slug: string | number; name: string | number; [key: string]: any }[];
  filterKey: Key;
  hideLabelAll?: boolean;
};

export default function VideosFilterItems({
  onFilter,
  params,
  items,
  filterKey,
  hideLabelAll,
}: VideosFilterItemsProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {!hideLabelAll && (
        <TouchableOpacity
          onPress={() => {
            onFilter({ ...params, [filterKey]: undefined });
          }}
        >
          <Text
            style={[
              styles.filterItem,
              params[filterKey as Key]
                ? styles.colorText
                : styles.filterItemActive,
            ]}
          >
            Toàn bộ
          </Text>
        </TouchableOpacity>
      )}
      {items.map(({ slug, name }, index) => (
        <TouchableOpacity
          key={slug}
          onPress={() => {
            onFilter({ [filterKey]: slug });
          }}
          style={{ marginLeft: hideLabelAll && index === 0 ? 0 : 10 }}
        >
          <Text
            style={[
              styles.filterItem,
              params[filterKey as Key] === slug
                ? styles.filterItemActive
                : styles.colorText,
            ]}
          >
            {name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  filterItem: {
    borderWidth: 1,
    borderColor: colors.DARK,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
  },
  filterItemActive: {
    color: colors.PINK,
  },
  colorText: {
    color: colors.TEXT,
  },
});
