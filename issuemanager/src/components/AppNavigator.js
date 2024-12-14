import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";


import AuthNavigator from "./AuthNavigator";
import HomeScreen from "../screens/HomeScreen";


const Stack = createStackNavigator();


const AppNavigator = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Stack.Navigator>
      {token ? (
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
