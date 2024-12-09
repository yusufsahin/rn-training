import React from 'react'
import { Provider } from 'react-redux'
import store from './src/app/store'
import Notes from './src/features/notes/Notes'

const App = () => {
  return (
    <Provider store={store}>
     <Notes/>  
    </Provider>
  )
}

export default App;