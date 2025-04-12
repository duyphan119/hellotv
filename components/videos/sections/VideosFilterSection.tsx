import { globalStyles } from "@/utils/styles";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import VideosFilterItem from "./VideosFilterItem";
import useGetCategories from "@/hooks/useGetCategories";
import useGetCountries from "@/hooks/useGetCountries";
import { VideosFilter } from "@/app/(tabs)/videos";
import { useEffect } from "react";
type VideosFilterSectionProps = VideosFilter & {
  onFilter: (filter: VideosFilter) => void;
};
export default function VideosFilterSection({
  // countrySlug,
  // categorySlug,
  // typeList,
  // year,
  onFilter,
  ...props
}: VideosFilterSectionProps) {
  const { data: categoriesData } = useGetCategories();
  const { data: countriesData } = useGetCountries();

  const { countrySlug, categorySlug, typeList, year } = props;

  const date = new Date();

  return (
    <View style={{ padding: 10, gap: 10 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <VideosFilterItem
          title="Toàn bộ"
          isActive={typeList === ""}
          onPress={() => onFilter({ ...props, typeList: "" })}
        />
        {[
          { name: "Phim bộ", slug: "phim-bo" },
          { name: "Phim lẻ", slug: "phim-le" },
          { name: "Hoạt hình", slug: "hoat-hinh" },
          { name: "TV shows", slug: "tv-shows" },
        ].map((item) => (
          <VideosFilterItem
            key={item.slug}
            title={item.name}
            isActive={typeList === item.slug}
            onPress={() => onFilter({ ...props, typeList: item.slug })}
            style={{ marginLeft: 10 }}
          />
        ))}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <VideosFilterItem
          title="Toàn bộ"
          isActive={countrySlug === ""}
          onPress={() => onFilter({ ...props, countrySlug: "" })}
        />
        {countriesData?.map((item) => (
          <VideosFilterItem
            key={item.slug}
            title={item.name}
            isActive={countrySlug === item.slug}
            onPress={() => onFilter({ ...props, countrySlug: item.slug })}
            style={{ marginLeft: 10 }}
          />
        ))}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <VideosFilterItem
          title="Toàn bộ"
          isActive={categorySlug === ""}
          onPress={() => onFilter({ ...props, categorySlug: "" })}
        />
        {categoriesData?.map((item) => (
          <VideosFilterItem
            key={item.slug}
            title={item.name}
            isActive={categorySlug === item.slug}
            onPress={() => onFilter({ ...props, categorySlug: item.slug })}
            style={{ marginLeft: 10 }}
          />
        ))}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <VideosFilterItem
          title="Toàn bộ"
          isActive={year === ""}
          onPress={() => onFilter({ ...props, year: "" })}
        />
        {new Array(date.getFullYear() - 1970)
          .fill(date.getFullYear())
          .map((value, index) => {
            const yearValue = value - index;
            return (
              <VideosFilterItem
                key={index}
                title={yearValue}
                isActive={year === yearValue}
                onPress={() => onFilter({ ...props, year: yearValue })}
                style={{ marginLeft: 10 }}
              />
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
