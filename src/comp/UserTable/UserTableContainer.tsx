import { UserTable } from './UserTable'
import { connect } from 'react-redux'
import React from 'react'
import { ReduxState } from '../../types/types'

const UserTableContainer = () => {
  return (
    <UserTable/>
  )
}

const mapState = (state: ReduxState) => {
  return {
    isFetching: state.users.isFetching,
    allUsers: state.users.allUsers
  }
}

export default connect(mapState)(UserTableContainer)
