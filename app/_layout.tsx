import QueryProvider from "@/components/providers/QueryProvider";
import { useScreenOrientation } from "@/hooks/useScreenOrientation";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const { isLandscape } = useScreenOrientation();

  return (
    <QueryProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          navigationBarHidden: isLandscape,
          navigationBarColor: "black",
          // headerStyle: {
          //   backgroundColor: "black",
          // },
          // headerTitleStyle: {
          //   color: "white",
          // },
          // headerSearchBarOptions: {
          //   // textColor: "white",
          //   // headerIconColor: "white",
          //   // shouldShowHintSearchIcon: false,
          //   placeholder: "Tìm kiếm",
          //   tintColor: "red",
          // },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ orientation: "portrait" }} />

        <Stack.Screen
          name="video/[slug]"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
            animationDuration: 678,
            headerShown: false,
            fullScreenGestureEnabled: true,
          }}
        />
      </Stack>
      <StatusBar style="auto" hidden={isLandscape} />
    </QueryProvider>
  );
}
