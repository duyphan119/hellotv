import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "fuchsia",
        tabBarStyle: {
          backgroundColor: "black",
        },
        tabBarInactiveTintColor: "white",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="house" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Khám phá",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          title: "Phim",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="movie" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="watched"
        options={{
          headerShown: true,
          title: "Đã xem",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="history" color={color} />
          ),
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: { color: "white" },
          headerTitle: "Đã xem gần đây",
        }}
      />
    </Tabs>
  );
}
