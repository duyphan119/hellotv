import { TypeList } from "@/data/typeList";
import { VideoLanguage } from "@/data/videoLanguages";

export type LatestVideo = {
  modified: {
    time: string;
  };
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  poster_url: string;
  thumb_url: string;
  year: number;
};

export type Video = {
  modified: {
    time: string;
  };
  created: {
    time: string;
  };
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  poster_url: string;
  thumb_url: string;
  content: string;
  type: string;
  status: string;
  is_copyright: boolean;
  sub_docquyen: boolean;
  chieurap: boolean;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  notify: string;
  showtimes: string;
  year: number;
  view: number;
  actor: string[];
  director: string[];
  category: Category[];
  country: Country[];
};

export type Country = { id: string; name: string; slug: string };
export type Category = { id: string; name: string; slug: string };

export type Episode = {
  server_name: string;
  server_data: ServerData[];
};

export type ServerData = {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
};

export type SeoOnPage = {
  og_type: string;
  titleHead: string;
  descriptionHead: string;
  og_image: string[];
  og_url: string;
};

export type BreadCrumbItem = {
  name: string;
  slug?: string;
  isCurrent?: boolean;
  position: number;
};

export type Pagination = {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  totalPages: number;
};

export type Params = {
  type_slug: string;
  filterCategory: string[];
  filterCountry: string[];
  filterYear: string;
  filterType: string;
  sortField: string;
  sortType: string;
  pagination: Pagination;
};

export type SearchVideosParams = {
  page?: number;
  limit?: number;
  year?: number;
  country?: string;
  sort_lang?: VideoLanguage;
  category?: string;
  sort_type?: "desc" | "asc";
  sort_field?: string;
};

export type VideosParams = SearchVideosParams & {
  type_list?: TypeList;
};

export type LatestVideosParams = {
  page?: number;
};

export type Response<T> = {
  seoOnPage: SeoOnPage;
  breadCrumb: BreadCrumbItem[];
  titlePage: string;
  items: T[];
  params: Params;
  type_list: string;
  APP_DOMAIN_FRONTEND: string;
  APP_DOMAIN_CDN_IMAGE: string;
};

export type VideosResponse = Response<Video>;

export type LatestVideosResponse = {
  items: LatestVideo[];
  pagination: Pagination;
};

export type CategoriesResponse = Response<Category>;

export type DownloadedVideo = {
  uri: string;
  filename: string;
  slug: string;
  image: string;
  videoSlug: string;
  serverName: string;
};

export type WatchingVideo = {
  currentTime: number;
  duration: number;
  serverName: string;
  posterUrl: string;
  thumbnailUrl: string;
  name: string;
  slug: string;
  episodeSlug: string;
  time: number;
};
