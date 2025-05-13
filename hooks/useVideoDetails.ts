import { Episode, Video, VideoServer } from "@/data/video";
import { create } from "zustand";

type InitProps = {
  video: Video | null;
  servers: VideoServer[];
  episode: Episode | undefined;
  server: VideoServer | undefined;
  initialTime: number;
  currentIndexEpisode: number;
};

type State = InitProps & {
  isFullscreen: boolean;
  currentTime: number;
  duration: number;
  selectingServer: VideoServer | undefined;

  enterFullscreen: () => void;
  exitFullscreen: () => void;
  selectServer: (server: VideoServer) => void;
  selectEpisode: (episode: Episode, index: number) => void;
  init: (props: InitProps) => void;
  goNextEpisode: () => void;
  goPreviousEpisode: () => void;
};

export const useVideoDetails = create<State>((set) => ({
  isFullscreen: false,
  currentTime: 0,
  duration: 0,
  episode: undefined,
  server: undefined,
  servers: [],
  video: null,
  initialTime: -1,
  selectingServer: undefined,
  currentIndexEpisode: -1,

  enterFullscreen: () => set({ isFullscreen: true }),
  exitFullscreen: () => set({ isFullscreen: false }),
  selectServer: (server: VideoServer) => set({ selectingServer: server }),
  selectEpisode: (episode: Episode, index: number) =>
    set((state) => ({
      server: state.selectingServer,
      episode,
      initialTime: 0,
      currentIndexEpisode: index,
    })),
  init: (props: InitProps) => set({ ...props, selectingServer: props.server }),
  goNextEpisode: () =>
    set((state) => {
      if (!state.server) return state;
      const newIndex =
        (state.currentIndexEpisode + 1) % state.server.episodes.length;
      return {
        ...state,
        currentIndexEpisode: newIndex,
        episode: state.server.episodes[newIndex],
        initialTime: 0,
      };
    }),
  goPreviousEpisode: () =>
    set((state) => {
      if (!state.server) return state;
      const newIndex =
        (state.currentIndexEpisode - 1 + state.server.episodes.length) %
        state.server.episodes.length;
      return {
        ...state,
        currentIndexEpisode: newIndex,
        episode: state.server.episodes[newIndex],
        initialTime: 0,
      };
    }),
}));
