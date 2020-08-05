import React, { FunctionComponent, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SortingMode, User } from '../../types/types'
import { Table } from 'reactstrap'
import classes from './UserTable.module.css'

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
interface BlockProps {
    user?: User
}
const SelectedBlock: FunctionComponent<BlockProps> = ({ user }) => {
  return (
    <>
      {!user
        ? <></>
        : <div className={classes.selectedWrapper}>
          <div className={classes.selectedLine}>
            <h4>ID :</h4> <div>{user.id}</div>
          </div>
          <div className={classes.selectedLine}>
            <h4>First name :</h4> <div>{user.firstName}</div>
          </div>
          <div className={classes.selectedLine}>
            <h4>Last name :</h4> <div>{user.lastName}</div>
          </div>
          <div className={classes.selectedLine}>
            <h4>Email :</h4> <div>{user.email}</div>
          </div>
          <div className={classes.selectedLine}>
            <h4>Phone :</h4> <div>{user.phone}</div>
          </div>
          {user.description
            ? <div className={classes.selectedLine}>
              <h4>Description :</h4> <div>{user.description}</div>
            </div>
            : <></>
          }
          {user.address
            ? <div className={classes.addressLine}>
              <h4>Adress :</h4>
              <div className={classes.addressSubline}>
                <h5>State : </h5>{user.address?.state}
              </div>
              <div className={classes.addressSubline}>
                <h5>City : </h5>{user.address?.city}
              </div>
              <div className={classes.addressSubline}>
                <h5>Street : </h5>{user.address?.streetAddress}
              </div>
              <div className={classes.addressSubline}>
                <h5>ZIP : </h5>{user.address?.zip}
              </div>
            </div>
            : <></>
          }
        </div>
      }
    </>
  )
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
  const [selected, setSelected] = useState<User>()
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
                <tr key={user.id + user.phone} onClick={() => {
                  setSelected(user)
                }}>
                  <th scope="row" style={{ width: '10%' }}>{user.id}</th>
                  <td style={{ width: '20%' }}>{user.firstName}</td>
                  <td style={{ width: '20%' }}>{user.lastName}</td>
                  <td style={{ width: '30%' }}>{user.email}</td>
                  <td style={{ width: '20%' }}>{user.phone}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <SelectedBlock user={selected}/>
    </>
  )
}
