// eslint-disable-next-line no-unused-vars
import { ReduxState, User, UsersReducerState, ValidAction } from '../../types/types'
// eslint-disable-next-line no-unused-vars
import { ThunkAction } from 'redux-thunk'
// eslint-disable-next-line no-unused-vars
import { Action } from 'redux'
import api from '../../DAL/api/api'

const initialState: UsersReducerState = {
  isFetching: false,
  allUsers: []
}

const TOGGLE_FETCHING = 'USERS/TOGGLE_FETCHING'
const SET_USERS = 'USERS/SET_USERS'

type ALL_ACTIONS = typeof TOGGLE_FETCHING | typeof SET_USERS

const usersReducer = (state = initialState, action: ValidAction<ALL_ACTIONS, any>): UsersReducerState => {
  const stateCopy: UsersReducerState = { ...state }
  stateCopy.allUsers = [...state.allUsers]
  switch (action.type) {
    case SET_USERS: {
      stateCopy.allUsers = action.payload
      break
    }
    case TOGGLE_FETCHING: {
      stateCopy.isFetching = !stateCopy.isFetching
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

const setAllUsers = (allUsers: Array<User>): ValidAction<typeof TOGGLE_FETCHING, Array<User>> => {
  return {
    type: TOGGLE_FETCHING,
    payload: allUsers
  }
}

const fetchAllUsers = (): ThunkAction<void, ReduxState, unknown, Action<unknown>> => async dispatch => {
  dispatch(toggleFetching())
  api.getBigSet()
    .then(array => {
      dispatch(toggleFetching())
      dispatch(setAllUsers(array))
    })
    .catch(err => {
      console.log(err)
      dispatch(toggleFetching())
    })
}

export { usersReducer, fetchAllUsers }
