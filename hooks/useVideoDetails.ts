import VideoDetailsContext from "@/contexts/VideoDetailsContext";
import { useContext } from "react";

export function useVideoDetails() {
  return useContext(VideoDetailsContext);
}
