// eslint-disable-next-line no-unused-vars
import { Action } from 'redux'

export interface ValidAction<T, E> extends Action {
    type: T,
    payload?: E
}

export interface UsersReducerState {
    isFetching: boolean,
    allUsers: Array<User>
}

export interface ReduxState {
    users: UsersReducerState
}

interface Address {
    streetAddress: string,
    city: string,
    state: string,
    zip: string
}

export interface User {
    id: number
    firstName: string,
    lastName: string,
    email: string,
    phone: string
    address?: Address,
    description?: string
}
