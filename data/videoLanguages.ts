export type VideoLanguage = (typeof videoLanguages)[number]["slug"];

const videoLanguages = [
  {
    id: "viet-sub",
    slug: "viet-sub",
    name: "Vietsub",
  },
  {
    id: "thuyet-minh",
    slug: "thuyet-minh",
    name: "Thuyết minh",
  },
  {
    id: "long-tieng",
    slug: "long-tieng",
    name: "Lồng tiếng",
  },
] as const;

export default videoLanguages;
