import { getCategories } from "@/data/category";
import { useQuery } from "@tanstack/react-query";

export default function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}
