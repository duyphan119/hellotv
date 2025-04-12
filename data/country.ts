import axios from "axios";

export type Country = {
  id: string;
  name: string;
  slug: string;
};

export const getCountries = async () => {
  try {
    const { data } = await axios.get("https://phimapi.com/quoc-gia");
    return data as Country[];
  } catch (error) {
    console.log("getCountries error", error);
    return [];
  }
};
