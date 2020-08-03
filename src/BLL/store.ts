import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { usersReducer } from './reducers/usersReducer'
const reducers = combineReducers({
  users: usersReducer
})
const store = createStore(reducers, applyMiddleware(thunk))
export default store
