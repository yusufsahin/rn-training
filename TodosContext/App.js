import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TodoProvider } from './src/context/TodoContext'
import TodoScreen from './src/screens/TodoScreen'

const App = () => {
  return (
    <TodoProvider>
      <TodoScreen/>
    </TodoProvider>
  )
}

export default App
