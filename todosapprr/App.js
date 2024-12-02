
import React from 'react'
import { Provider } from 'react-redux';
import store from './src/store/store';
import TodosScreen from './src/screens/TodosScreen';

const App = () => {
  return (
    <>
    <Provider store={store}>
    <TodosScreen/>
    </Provider>
    </>  
  );
}

export default App;

