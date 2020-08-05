import { UserTable } from './UserTable'
import { connect, ConnectedProps } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { FetchingVolume, FilteringConfig, ReduxState, SortingMode, User } from '../../types/types'
import { addNewUser, fetchAllUsers } from '../../BLL/reducers/usersReducer'
import { Preloader } from '../Preloader/Preloader'
import { CustomPagination } from '../Pagination/Pagination'
import { Filtering } from '../Filtering/Filtering'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { AddUserForm } from '../AddUserForm/AddUserForm'
import { Layout } from '../Layout/Layout'
import classes from './UserTable.module.css'
import { ChooseVolumeScreen } from '../ChooseVolumeScreen/ChooseVolumeScreen'

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
const UserTableContainer = (props: ConnectedProps<typeof connector>) => {
  const [volume, setVolume] = useState<FetchingVolume>()
  useEffect(() => {
    if (!props.allUsers.length && !props.isFetching && volume !== undefined) props.fetchAllUsers(volume)
  })
  const [sort, setSort] = useState<SortingMode>({
    key: 'id',
    direction: 'UP'
  })
  const [filter, setFilter] = useState<FilteringConfig>({
    key: 'id',
    substr: ''
  })
  const [page, setPage] = useState<number>(1)
  const setFilt = (filt: any) => {
    setFilter(filt)
    setPage(1)
  }
  const currList = props.allUsers
    .sort((a, b) => {
      return sortListByMode(a, b, sort)
    })
    .filter(user => {
      return filter.substr === '' || user[filter.key]?.toString().toLowerCase().includes(filter.substr.toLowerCase())
    })
  const tableList = currList.slice((page - 1) * TABLE_SIZE, page * TABLE_SIZE)
  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    setModal(!modal)
  }

  const addUser = (user: User) => {
    toggleModal()
    props.addUser(user)
  }

  return (
    <Layout>
      {!props.allUsers.length
        ? props.isFetching
          ? <Preloader/>
          : <>
            <ChooseVolumeScreen setVolume={setVolume}/>
          </>
        : <>
          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Add user</ModalHeader>
            <ModalBody>
              <AddUserForm addUser={addUser}/>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
          <div className={classes.btnWrapper}>
            <Button color={'success'} onClick={toggleModal} className={classes.addBtn}>Add user</Button>
          </div>
          <Filtering setFilter={setFilt}/>
          {
            currList.length > 0
              ? <>
                <CustomPagination key={1} list={currList} page={page} setPage={setPage}/>
                <UserTable currList={tableList} sort={sort} setSort={setSort}/>
                <CustomPagination key={2} list={currList} page={page} setPage={setPage}/>
              </>
              : <h2><b>Try another search request</b></h2>
          }
        </>
      }
    </Layout>
  )
}

const mapState = (state: ReduxState) => {
  return {
    isFetching: state.users.isFetching,
    allUsers: state.users.allUsers
  }
}
const mapDispatch = {
  fetchAllUsers: (volume: FetchingVolume) => (fetchAllUsers(volume)),
  addUser: (user: User) => (addNewUser(user))
}

const connector = connect(mapState, mapDispatch)

export default (connector(UserTableContainer))
