import useGetVideosByCountry from "@/hooks/useGetVideosByCountry";
import { StyleSheet, Text, View } from "react-native";
import VideosSection from "./VideosSection";

type VideosByCountrySectionProps = {
  countrySlug: string;
};

export default function VideosByCountrySection({
  countrySlug,
}: VideosByCountrySectionProps) {
  const { data } = useGetVideosByCountry(countrySlug, { limit: 6 });
  if (!data) return null;
  return (
    <VideosSection
      title={data.titlePage}
      href={{
        pathname: "/videos",
        params: {
          countrySlug,
        },
      }}
      videos={data.items}
    />
  );
}

const styles = StyleSheet.create({});
