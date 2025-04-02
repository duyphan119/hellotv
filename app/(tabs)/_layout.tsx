import colors from "@/data/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.PRIMARY,
          tabBarStyle: {
            backgroundColor: colors.DARK,
          },
          tabBarInactiveTintColor: colors.LIGHT,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Trang chủ",
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name="home" color={color} />
            ),
            animation: "fade",
          }}
        />
        <Tabs.Screen
          name="video/[video_slug]"
          options={{
            href: null,
            animation: "fade",
          }}
        />
        <Tabs.Screen
          name="video/watching"
          options={{
            href: null,
            animation: "fade",
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Khám phá",
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name="search" color={color} />
            ),
            animation: "fade",
          }}
        />
        <Tabs.Screen
          name="[videos_params]"
          options={{
            title: "Phim",
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name="movie" color={color} />
            ),
            animation: "fade",
          }}
        />
      </Tabs>
    </>
  );
}
