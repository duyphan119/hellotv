import AsyncStorage from "@react-native-async-storage/async-storage";

export type WatchedVideo = {
  video: {
    slug: string;
    name: string;
    thumbnail: string;
    poster: string;
  };
  episode: {
    currentTime: number;
    duration: number;
    serverName: string;
    name: string;
  };
  time: number;
};

const STORAGE_KEY = "watchedVideos";

export const getWatchedVideos = async (): Promise<WatchedVideo[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue !== null) {
      const time = new Date().getTime();
      return JSON.parse(jsonValue).filter(
        (item: WatchedVideo) => item.time + 3 * 24 * 60 * 60 * 1000 > time
      );
    }
  } catch (error) {
    console.log("getWatchedVideos error", error);
  }
  return [];
};

export const getWatchedVideo = async (slug: string) => {
  try {
    const watchedVideos = await getWatchedVideos();

    return watchedVideos.find(({ video }) => video.slug === slug) || null;
  } catch (error) {
    console.log("getWatchedVideo error", error);
  }

  return null;
};

export const createWatchedVideo = async (inputs: WatchedVideo) => {
  try {
    const watchedVideos = await getWatchedVideos();

    const index = watchedVideos.findIndex(
      ({ video: { slug } }) => slug === inputs.video.slug
    );

    if (index !== -1) {
      watchedVideos.splice(index, 1);
    }
    watchedVideos.unshift(inputs);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(watchedVideos));
  } catch (error) {
    console.log("createWatchedVideo error", error);
  }
};

export const deleteWatchedVideo = async (videoSlug: string) => {
  try {
    const watchedVideos = await getWatchedVideos();
    const index = watchedVideos.findIndex(
      ({ video: { slug } }) => slug === videoSlug
    );

    if (index !== -1) {
      watchedVideos.splice(index, 1);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(watchedVideos));
    }
  } catch (error) {
    console.log("deleteWatchedVideo error", error);
  }
};
