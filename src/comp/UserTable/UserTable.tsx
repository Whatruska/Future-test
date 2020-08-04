import React, { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SortingMode, User } from '../../types/types'
import { Table } from 'reactstrap'

interface Props {
  currList: Array<User>,
  setSort: (sort: SortingMode) => void,
  sort: SortingMode,
}

interface HeadingProps {
    setSort: (sort: SortingMode) => void,
    sort: SortingMode,
    part: keyof User,
    label: string
}

const CustomHeading: FunctionComponent<HeadingProps> = ({ setSort, label, sort, part }) => {
  const changeSort = () => {
    if (sort.key === part && sort.direction === 'UP') setSort({ key: part, direction: 'DOWN' })
    else setSort({ key: part, direction: 'UP' })
  }

  const currIcon = sort.key === part
    ? sort.direction === 'UP'
      ? <FontAwesomeIcon icon={['fas', 'chevron-circle-down']} />
      : <FontAwesomeIcon icon={['fas', 'chevron-circle-up']} />
    : <FontAwesomeIcon icon={['fas', 'circle']} />
  return (
    <th onClick={changeSort}>{label} {currIcon}</th>
  )
}

export const UserTable: FunctionComponent<Props> = ({ currList, sort, setSort }) => {
  return (
    <>
      <Table striped bordered>
        <thead>
          <tr>
            <CustomHeading label={'ID'} part={'id'} setSort={setSort} sort={sort}/>
            <CustomHeading label={'First name'} part={'firstName'} setSort={setSort} sort={sort}/>
            <CustomHeading label={'Last name'} part={'lastName'} setSort={setSort} sort={sort}/>
            <CustomHeading label={'Email'} part={'email'} setSort={setSort} sort={sort}/>
            <CustomHeading label={'Phone'} part={'phone'} setSort={setSort} sort={sort}/>
          </tr>
        </thead>
        <tbody>
          {
            currList.map(user => {
              return (
                <tr key={user.id + user.phone}>
                  <th scope="row">{user.id}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </>
  )
}
