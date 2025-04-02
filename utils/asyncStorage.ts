import { DownloadedVideo, WatchingVideo } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

export const getWatchingVideos = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("watchingvideos");
    if (jsonValue != null) {
      return JSON.parse(jsonValue) as WatchingVideo[];
    }
  } catch (error) {
    console.log("getWatchingVideos error: ", error);
  }
  return [];
};

export const saveWatchingVideos = async (watchingVideos: WatchingVideo[]) => {
  try {
    await AsyncStorage.setItem(
      "watchingvideos",
      JSON.stringify(watchingVideos)
    );
  } catch (error) {
    console.log("saveWatchingVideos error: ", error);
  }
};

export const saveWatchingVideo = async (newItem: WatchingVideo) => {
  try {
    const watchingVideos = await getWatchingVideos();
    const index = watchingVideos.findIndex(
      (item) => item.slug === newItem.slug
    );
    console.log("newItem", newItem);
    if (index === -1) {
      await AsyncStorage.setItem(
        "watchingvideos",
        JSON.stringify([newItem, ...watchingVideos])
      );
    } else {
      watchingVideos.splice(index, 1);
      watchingVideos.unshift(newItem);

      await AsyncStorage.setItem(
        "watchingvideos",
        JSON.stringify(watchingVideos)
      );
    }
  } catch (error) {
    console.log("saveWatchingVideo error: ", error);
  }
};
