import React from 'react'
import { Provider } from 'react-redux'
import store from './src/app/store'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import BlogList from './src/features/blog/BlogList';
import EditBlog from './src/features/blog/EditBlog';

const Stack= createStackNavigator();

const App = () => {
  return (
   <Provider store={store}>
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="BlogList" component={BlogList} options={{ title: 'Blogs' }} />
          <Stack.Screen name="EditBlog" component={EditBlog} options={{ title: 'Edit Blog' }} />
        </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
};

export default App;