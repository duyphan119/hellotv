import { useVideoDetails } from "@/hooks/useVideoDetails";
import VideoPlayer from "./VideoPlayer";
import { useEffect, useState } from "react";

type StreamingProps = {
  source: string;
};

export default function Streaming({ source }: StreamingProps) {
  const { currentTime, isFocused } = useVideoDetails();

  // const [open, setOpen] = useState<boolean>(false);

  // useEffect(() => {
  //   setOpen(isFocused);
  // }, [isFocused]);

  if (currentTime < 0) return null;
  return (
    <VideoPlayer
      source={source}
      currentTime={currentTime}
      // onCloseStreaming={() => setOpen(false)}
    />
  );
}
