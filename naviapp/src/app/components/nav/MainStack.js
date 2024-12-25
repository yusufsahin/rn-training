import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import EventsList from "../../../features/Events/SimInfo";
import CreateEvent from "../../../features/Events/DeviceInfo";
import Profile from "../../../features/Profiles/Profile";
import DeviceInfo from "../../../features/Events/DeviceInfo";
import SimInfo from "../../../features/Events/SimInfo";

const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "DeviceInfo") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "SimInfo") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="DeviceInfo" component={DeviceInfo} />
      <Tab.Screen name="SimInfo" component={SimInfo} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default MainStack;
