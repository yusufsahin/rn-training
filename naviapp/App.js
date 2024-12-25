import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/app/components/nav/MainStack";

import LoginStack from "./src/app/components/nav/LoginStack";

const RootNavigator = () => {
   const  userauth = false;

   //useEffect ile auth kontrolü yapılacak ve profile

   if(userauth){
     return (
       <SafeAreaView style={{flex:1}}>
         <MainStack />
      </SafeAreaView>
      );
    }else{
      return (
        <SafeAreaView style={{flex:1}}>
          <LoginStack />
        </SafeAreaView>
      );
    } 
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

