import colors from "@/data/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs, useNavigation } from "expo-router";

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
          }}
        />
        <Tabs.Screen
          name="video/[video_slug]"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Khám phá",
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name="search" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="[videos_params]"
          options={{
            title: "Phim",
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name="movie" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="video/watching"
          options={{
            title: "Gần đây",
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name="history" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
