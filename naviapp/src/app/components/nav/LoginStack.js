import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../../../features/Auth/Login';
import Register from '../../../features/Auth/Register';

const Stack = createStackNavigator();


const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
     
    </Stack.Navigator>
  )
}

export default LoginStack