import QueryProvider from "@/components/providers/QueryProvider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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
      <StatusBar style="auto" />
    </QueryProvider>
  );
}
