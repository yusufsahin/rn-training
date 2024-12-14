import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { store } from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/components/AppNavigator";
import { Provider, useSelector, dispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { rehydrate } from "./src/redux/authSlice";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          store.dispatch(rehydrate({ token }));
        }
      } catch (error) {
        console.log("App.js - useEffect - error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  </Provider>
);
