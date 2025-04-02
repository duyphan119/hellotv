import { Category } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useGetCountries() {
  const query = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await fetch("https://phimapi.com/quoc-gia");
      return (await response.json()) as Category[];
    },
  });

  return query;
}
