import { create } from "zustand";

type UseScreenOrientationState = {
  // orientationInfo: ScreenOrientation.ScreenOrientationInfo;
  // setOrientationInfo: (orientationInfo:ScreenOrientation.ScreenOrientationInfo) => void;
  isLandscape: boolean;
  // isAllowChange: boolean;
  setIsLandscape: (isLandscape: boolean) => void;
  // allowChange: () => void;
  // preventChange: () => void;
};

export const useScreenOrientation = create<UseScreenOrientationState>(
  (set) => ({
    // orientationInfo: ScreenOrientation.Orientation.UNKNOWN
    isLandscape: false,
    // isAllowChange: false,
    setIsLandscape: (isLandscape: boolean) => set({ isLandscape }),
    // set((state) => (state.isAllowChange ? { ...state, isLandscape } : state)),
    // allowChange: () => set({ isAllowChange: true }),
    // preventChange: () => set({ isAllowChange: false }),
  })
);
