import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import './App.css'
import store from './BLL/store'
import UserTableContainer from './comp/UserTable/UserTableContainer'

function App () {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.public_url}>
        <Provider store={store}>
          <UserTableContainer/>
        </Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
