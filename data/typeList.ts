export type TypeList = (typeof typeList)[number]["slug"];

const typeList = [
  {
    id: "phim-bo",
    slug: "phim-bo",
    name: "Phim bộ",
  },
  {
    id: "phim-le",
    slug: "phim-le",
    name: "Phim lẻ",
  },
  {
    id: "tv-shows",
    slug: "tv-shows",
    name: "TV shows",
  },
  {
    id: "hoat-hinh",
    slug: "hoat-hinh",
    name: "Hoạt hình",
  },
  // {
  //   id: "phim-thuyet-minh",
  //   name: "Phim thuyết minh",
  // },
  // {
  //   id: "phim-long-tieng",
  //   name: "Phim lồng tiếng",
  // },
] as const;

export default typeList;
