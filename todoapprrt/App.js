import React from 'react'
import { Provider } from 'react-redux'
import store from './src/app/store/store'
import Todos from './src/features/Todos/Todos'
import TodosScreen from './src/features/Todos/TodosScreen'

const App = () => {
  return (
   <>
   <Provider store={store}>
      <TodosScreen/>
   </Provider>
    </>
  )
}

export default App
