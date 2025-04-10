import { ScrollView, StyleSheet, Text, View } from "react-native";
import useGetCountries from "@/hooks/useGetCountries";
import { Link } from "expo-router";
import colors from "@/data/colors";

export default function Countries() {
  const { data: countriesData } = useGetCountries();
  if (!countriesData) return null;
  return (
    <View>
      <Text style={styles.title}>Quốc gia</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator>
        {countriesData.map(({ name, slug }, index) => (
          <Link
            key={name}
            href={{
              pathname: "/(tabs)/[videos_params]",
              params: {
                videos_params: JSON.stringify({ country: slug }),
              },
            }}
            style={[styles.countryName, { marginLeft: index > 0 ? 10 : 0 }]}
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
  countryName: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    backgroundColor: colors.PRIMARY,
    color: colors.LIGHT,
    borderRadius: 5,
  },
});
