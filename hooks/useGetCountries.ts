import { getCountries } from "@/data/country";
import { useQuery } from "@tanstack/react-query";

export default function useGetCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });
}
