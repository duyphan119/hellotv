import { Category } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useGetCategories() {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("https://phimapi.com/the-loai");
      return (await response.json()) as Category[];
    },
  });

  return query;
}
