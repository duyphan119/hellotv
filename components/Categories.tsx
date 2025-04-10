import { ScrollView, StyleSheet, Text, View } from "react-native";
import useGetCategories from "@/hooks/useGetCategories";
import { Link } from "expo-router";
import colors from "@/data/colors";

export default function Categories() {
  const { data: categoriesData } = useGetCategories();
  if (!categoriesData) return null;
  return (
    <View>
      <Text style={styles.title}>Thể loại</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator>
        {categoriesData.map(({ name, slug }, index) => (
          <Link
            key={name}
            href={{
              pathname: "/(tabs)/[videos_params]",
              params: {
                videos_params: JSON.stringify({ category: slug }),
              },
            }}
            style={[styles.categoryName, { marginLeft: index > 0 ? 10 : 0 }]}
          >
            {name}
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingVertical: 12,
    color: colors.TEXT,
    paddingInline: 5,
  },
  categoryName: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    backgroundColor: colors.PRIMARY,
    color: colors.LIGHT,
    borderRadius: 5,
  },
});
