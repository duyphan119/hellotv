import { Country } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useGetCountries() {
  const query = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await fetch("https://phimapi.com/quoc-gia");
      const countries = (await response.json()) as Country[];

      return countries.sort((a, b) =>
        ["han-quoc", "trung-quoc", "nhat-ban"].includes(b.slug) ? 1 : -1
      );
    },
  });

  return query;
}
