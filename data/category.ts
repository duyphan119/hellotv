import axios from "axios";

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export const getCategories = async () => {
  try {
    const { data } = await axios.get("https://phimapi.com/the-loai");
    return data as Category[];
  } catch (error) {
    console.log("getCategories error", error);
    return [];
  }
};
