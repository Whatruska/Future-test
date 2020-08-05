import { Action } from 'redux'
import api from '../DAL/api/api'

export type FetchingMethods = typeof api.getBigSet & typeof api.getSmallSet

export enum FetchingVolume {
    SMALL, BIG
}

export interface FilteringConfig {
    key: keyof User,
    substr: string
}

export interface SortingMode {
    key: keyof User,
    direction: 'UP' | 'DOWN'
}

export interface ValidAction<T, E> extends Action{
    type: T,
    payload?: E
}

export interface UsersReducerState {
    isFetching: boolean,
    allUsers: Array<User>
}

export interface ReduxState {
    readonly users: UsersReducerState
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
