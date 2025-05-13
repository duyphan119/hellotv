import { useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigation } from "expo-router";

export function useIsFullscreen() {
  const navigation = useNavigation();

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const subscription = ScreenOrientation.addOrientationChangeListener(
      ({ orientationInfo: { orientation } }) => {
        setIsFullscreen(
          orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT ||
            orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT
        );
      }
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  const enterFullscreen = () => {
    navigation.setOptions({
      navigationBarHidden: true,
      statusBarHidden: true,
      orientation: "landscape",
    });
  };

  const exitFullscreen = () => {
    navigation.setOptions({
      navigationBarHidden: false,
      statusBarHidden: false,
      orientation: "portrait",
    });
  };

  return { isFullscreen, enterFullscreen, exitFullscreen };
}
