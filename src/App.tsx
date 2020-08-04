import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import './App.css'
import store from './BLL/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import UserTableContainer from './comp/UserTable/UserTableContainer'
library.add(fas)
function App () {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.public_url}>
        <Provider store={store}>
          <Switch>
            <Route path={'/:page?'}>
              <UserTableContainer/>
            </Route>
          </Switch>
        </Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
