import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";


import AuthNavigator from "./AuthNavigator";
import HomeScreen from "../screens/HomeScreen";
import UpdateProjectScreen from "../screens/UpdateProjectScreen";
import CreateProjectScreen from "../screens/CreateProjectScreen";
import ProjectDetail from "../screens/ProjectDetail";
import CreateWorkitem from "../screens/CreateWorkitem";

const Stack = createStackNavigator();


const AppNavigator = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Stack.Navigator>
      {token ? (
        <>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateProject"
          component={CreateProjectScreen}
          options={{ title: "Create Project" }}
        />
        <Stack.Screen
          name="UpdateProject"
          component={UpdateProjectScreen}
          options={{ title: "Update Project" }}
        />
        <Stack.Screen name ="ProjectDetail" component={ProjectDetail}
          options={{ title: "Project Details" }}/>
        <Stack.Screen name ="CreateWorkitem" component={CreateWorkitem}
          options={{ title: "Create Workitem" }}/>
        </>
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
