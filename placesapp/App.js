import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Geo from './src/app/Geo';
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible
        // Perform any async tasks like loading assets
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync(); // Hide the splash screen
      }
    }
    prepare();
  }, []);


  return (
    <View style={styles.container}>
      <Text>Places</Text>
      <StatusBar style="auto" />
      <Geo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
