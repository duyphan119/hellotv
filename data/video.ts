import axios from "axios";
import { Category } from "./category";
import { Country } from "./country";

export type LatestVideo = {
  id: string;
  name: string;
  originName: string;
  slug: string;
  thumbnail: string;
  poster: string;
  episodeCurrent: string;
  categories: Category[];
  countries: Country[];
  language: string;
  year: number;
};

export type Pagination = {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  totalItemsPerPage: number;
};

export type LatestVideoParams = {
  page?: number;
};

export const getLatestVideos = async (params?: LatestVideoParams) => {
  try {
    const {
      data: {
        items,
        pagination: { updateToday, ...pagination },
      },
    } = await axios.get("https://phimapi.com/danh-sach/phim-moi-cap-nhat-v3", {
      params,
    });

    const latestVideos: LatestVideo[] = items.map((item: any) => ({
      id: item._id,
      name: item.name,
      originName: item.origin_name,
      slug: item.slug,
      thumbnail: item.thumb_url,
      poster: item.poster_url,
      episodeCurrent: item.episode_current,
      countries: item.country,
      categories: item.category,
      language: item.lang,
    }));

    return {
      items: latestVideos,
      pagination: pagination as Pagination,
    };
  } catch (error) {
    console.log("getLatestVideos error", error);
    return {
      items: [],
      pagination: {
        totalItems: 0,
        currentPage: 1,
        totalPages: 1,
        totalItemsPerPage: 24,
      },
    };
  }
};

export type Video = LatestVideo & {
  director: string;
  actors: string[];
  content: string;
  totalEpisodes: number;
};

export type VideoServer = {
  name: string;
  episodes: Episode[];
};

export type Episode = {
  name: string;
  slug: string;
  filename: string;
  link_m3u8: string;
  link_embed: string;
};

const DEFAULT_VIDEOS_RESPONSE = {
  items: [],
  pagination: {
    totalItems: 0,
    currentPage: 1,
    totalPages: 1,
    totalItemsPerPage: 24,
  },
};

export const getVideo = async (slug: string) => {
  try {
    const {
      data: { movie, episodes },
    } = await axios.get(`https://phimapi.com/phim/${slug}`);

    const video: Video = {
      id: movie._id,
      name: movie.name,
      originName: movie.origin_name,
      slug: movie.slug,
      thumbnail: movie.thumb_url,
      poster: movie.poster_url,
      actors: movie.actor,
      content: movie.content,
      director: movie.director,
      categories: movie.category,
      countries: movie.country,
      episodeCurrent: movie.episode_current,
      language: movie.lang,
      totalEpisodes: +movie.episode_total,
      year: movie.year,
    };

    const servers: VideoServer[] = episodes.map((item: any) => ({
      name: item.server_name,
      episodes: item.server_data,
    }));

    return {
      video,
      servers,
    };
  } catch (error) {
    console.log("getVideo error", error);
    return {
      video: null,
      servers: [],
    };
  }
};

export type TypeList = "phim-bo" | "phim-le" | "tv-shows" | "hoat-hinh";

export type VideosParams = Partial<{
  page: number | string;
  sort_field: string;
  sort_type: "asc" | "desc";
  sort_lang: string;
  category: string;
  country: string;
  year: number | string;
  limit: number | string;
}>;

export const getVideosByTypeList = async (
  typeList: TypeList,
  params?: VideosParams
) => {
  try {
    const {
      data: {
        data: {
          items,
          APP_DOMAIN_CDN_IMAGE,
          params: { pagination },
          titlePage,
        },
      },
    } = await axios.get(`https://phimapi.com/v1/api/danh-sach/${typeList}`, {
      params,
    });

    return {
      titlePage,
      items: items.map((item: any) => ({
        id: item._id,
        name: item.name,
        originName: item.origin_name,
        slug: item.slug,
        thumbnail: `${APP_DOMAIN_CDN_IMAGE}/${item.thumb_url}`,
        poster: `${APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`,
        episodeCurrent: item.episode_current,
        countries: item.country,
        categories: item.category,
        language: item.lang,
      })) as LatestVideo[],
      pagination: pagination as Pagination,
    };
  } catch (error) {
    console.log("getVideosByTypeList error", error);
    return {
      titlePage: "",
      ...DEFAULT_VIDEOS_RESPONSE,
    };
  }
};

export const getVideosByCountry = async (
  countrySlug: string,
  params?: Omit<VideosParams, "country">
) => {
  try {
    const {
      data: {
        data: {
          items,
          APP_DOMAIN_CDN_IMAGE,
          params: { pagination },
          titlePage,
        },
      },
    } = await axios.get(`https://phimapi.com/v1/api/quoc-gia/${countrySlug}`, {
      params,
    });

    return {
      titlePage,
      items: items.map((item: any) => ({
        id: item._id,
        name: item.name,
        originName: item.origin_name,
        slug: item.slug,
        thumbnail: `${APP_DOMAIN_CDN_IMAGE}/${item.thumb_url}`,
        poster: `${APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`,
        episodeCurrent: item.episode_current,
        countries: item.country,
        categories: item.category,
        language: item.lang,
      })) as LatestVideo[],
      pagination: pagination as Pagination,
    };
  } catch (error) {
    console.log("getVideosByCountry error", error);
    return {
      titlePage: "",
      ...DEFAULT_VIDEOS_RESPONSE,
    };
  }
};

export type SearchVideosParams = VideosParams & { keyword: string };

export const searchVideos = async (params: SearchVideosParams) => {
  if (params.keyword) {
    try {
      const {
        data: {
          data: {
            items,
            APP_DOMAIN_CDN_IMAGE,
            params: { pagination },
          },
        },
      } = await axios.get(`https://phimapi.com/v1/api/tim-kiem`, {
        params,
      });

      return {
        items: items.map((item: any) => ({
          id: item._id,
          name: item.name,
          originName: item.origin_name,
          slug: item.slug,
          thumbnail: `${APP_DOMAIN_CDN_IMAGE}/${item.thumb_url}`,
          poster: `${APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`,
          episodeCurrent: item.episode_current,
          countries: item.country,
          categories: item.category,
          language: item.lang,
        })) as LatestVideo[],
        pagination: pagination as Pagination,
      };
    } catch (error) {
      console.log(`searchVideos error`, error);
    }
  }
  return DEFAULT_VIDEOS_RESPONSE;
};
