import { FetchingMethods, FetchingVolume, User, UsersReducerState, ValidAction } from '../../types/types'
import api from '../../DAL/api/api'

const USERS_LOCALSTORAGE_KEY = 'FUTURE_TEST_APP/USERS'
const CACHED_USERS = JSON.parse(window.localStorage.getItem(USERS_LOCALSTORAGE_KEY) as string)
const initialState: UsersReducerState = {
  isFetching: false,
  allUsers: CACHED_USERS === null ? [] : CACHED_USERS
}

const TOGGLE_FETCHING = 'USERS/TOGGLE_FETCHING'
const SET_USERS = 'USERS/SET_USERS'
const ADD_USER = 'USERS/ADD_USER'
type ALL_ACTIONS = typeof TOGGLE_FETCHING | typeof SET_USERS | typeof ADD_USER

const usersReducer = (state = initialState, action: ValidAction<ALL_ACTIONS, any>): UsersReducerState => {
  const stateCopy: UsersReducerState = { ...state }
  stateCopy.allUsers = [...state.allUsers]
  switch (action.type) {
    case SET_USERS: {
      stateCopy.allUsers = action.payload
      window.localStorage.setItem(USERS_LOCALSTORAGE_KEY, JSON.stringify(action.payload))
      break
    }
    case TOGGLE_FETCHING: {
      stateCopy.isFetching = !stateCopy.isFetching
      break
    }

    case ADD_USER : {
      stateCopy.allUsers.push(action.payload)
      break
    }
    default: {
      break
    }
  }
  return stateCopy
}

const toggleFetching = (): ValidAction<typeof TOGGLE_FETCHING, never> => {
  return {
    type: TOGGLE_FETCHING
  }
}

const setAllUsers = (allUsers: Array<User>): ValidAction<typeof SET_USERS, Array<User>> => {
  return {
    type: SET_USERS,
    payload: allUsers
  }
}

const addNewUser = (user: User): ValidAction<typeof ADD_USER, User> => {
  return {
    type: ADD_USER,
    payload: user
  }
}

const fetchAllUsers = (volume: FetchingVolume): any => {
  let fetchMethod: FetchingMethods = api.getBigSet
  switch (volume) {
    case FetchingVolume.BIG: {
      fetchMethod = api.getBigSet
      break
    }

    case FetchingVolume.SMALL: {
      fetchMethod = api.getSmallSet
    }
  }
  return (dispatch: any) => {
    dispatch(toggleFetching())
    fetchMethod()
      .then(array => {
        dispatch(setAllUsers(array))
        dispatch(toggleFetching())
      })
      .catch(err => {
        alert(err)
        dispatch(toggleFetching())
      })
  }
}

export { usersReducer, fetchAllUsers, addNewUser }
