import { toastConfig } from "@/Data/toastConfig";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#0f766e",
          tabBarInactiveTintColor: "#94a3b8",
          tabBarLabelStyle: { fontSize: 12 },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="Screen/PackagesScreen"
          options={{
            title: "Packages",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cube-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="Screen/AdminScreen"
          options={{
            title: "Admin",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />

        {/* Hidden screen: exists as a route, not shown in tab bar */}
        <Tabs.Screen
          name="Screen/CartScreen"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="Screen/BookAppointmentScreen"
          options={{
            href: null,
          }}
        />
      </Tabs>
      <Toast config={toastConfig} />
    </>
  );
}
