import { UserTable } from './UserTable'
import { connect, ConnectedProps } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import { ReduxState, SortingMode, User } from '../../types/types'
import { fetchAllUsers } from '../../BLL/reducers/usersReducer'
import { Preloader } from '../Preloader/Preloader'
import { RouteComponentProps } from 'react-router-dom'
import { CustomPagination } from '../Pagination/Pagination'

export const TABLE_SIZE = 50.0

const sortListByMode = (a: User, b: User, sort: SortingMode): number => {
  if (sort.key === 'id') {
    if (sort.direction === 'UP') return a.id - b.id
    return b.id - a.id
  } else {
    const obj1 = a[sort.key]
    const obj2 = b[sort.key]
    if (obj1 && obj2) {
      if (sort.direction === 'UP') return obj1.toString().localeCompare(obj2.toString())
      return obj2.toString().localeCompare(obj1.toString())
    }
    return 1
  }
}
interface RouterProps {
 page: string
}
const UserTableContainer = (props: ConnectedProps<typeof connector> & RouteComponentProps<RouterProps>) => {
  const page = props.match.params.page ? Number(props.match.params.page) : 1
  useEffect(() => {
    if (!props.allUsers.length && !props.isFetching) props.fetchAllUsers()
  })
  const [sort, setSort] = useState<SortingMode>({
    key: 'id',
    direction: 'UP'
  })
  const currList = props.allUsers.sort((a, b) => {
    return sortListByMode(a, b, sort)
  }).slice((page - 1) * TABLE_SIZE, page * TABLE_SIZE)
  return (
    <>
      {props.isFetching
        ? <Preloader/>
        : <>
          <CustomPagination list={props.allUsers} page={page}/>
          <UserTable currList={currList} sort={sort} setSort={setSort}/>
          <CustomPagination list={props.allUsers} page={page}/>
        </>
      }
    </>
  )
}

const mapState = (state: ReduxState) => {
  return {
    isFetching: state.users.isFetching,
    allUsers: state.users.allUsers
  }
}
const mapDispatch = {
  fetchAllUsers: () => (fetchAllUsers())
}

const connector = connect(mapState, mapDispatch)

export default withRouter(connector(UserTableContainer))
