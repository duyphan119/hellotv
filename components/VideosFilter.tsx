import videoLanguages from "@/data/videoLanguages";
import useGetCategories from "@/hooks/useGetCategories";
import useGetCountries from "@/hooks/useGetCountries";
import { VideosParams } from "@/types";
import { StyleSheet, View } from "react-native";
import VideosFilterItems from "./VideosFilterItems";
import typeList from "@/data/typeList";

type VideosFilterProps = {
  onFilter: (params: VideosParams) => void;
  params: VideosParams;
};

export default function VideosFilter({ onFilter, params }: VideosFilterProps) {
  const { data: categoriesData } = useGetCategories();
  const { data: countriesData } = useGetCountries();

  const currentYear = new Date().getFullYear();
  const years = new Array(currentYear - 1970)
    .fill(currentYear)
    .map((item, index) => {
      const value = item - index;
      return { slug: value, name: value };
    });

  return (
    <View style={styles.filterContainer}>
      <VideosFilterItems
        filterKey="type_list"
        items={typeList.map(({ slug, name }) => ({ name, slug }))}
        onFilter={onFilter}
        params={params}
        hideLabelAll
      />
      <VideosFilterItems
        filterKey="country"
        items={countriesData || []}
        onFilter={onFilter}
        params={params}
      />
      <VideosFilterItems
        filterKey="category"
        items={categoriesData || []}
        onFilter={onFilter}
        params={params}
      />
      <VideosFilterItems
        filterKey="year"
        items={years}
        onFilter={onFilter}
        params={params}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    gap: 10,
    marginBlock: 10,
  },
});
