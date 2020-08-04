import React, { FunctionComponent, SyntheticEvent } from 'react'
import { User } from '../../types/types'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { TABLE_SIZE } from '../UserTable/UserTableContainer'
interface Props {
    list: Array<User>,
    page: number
}
export const CustomPagination: FunctionComponent<Props> = ({ page, list }) => {
  const SIZE = Math.ceil(list.length / TABLE_SIZE)
  const renderLink = (page: number) => {
    return (
      <PaginationItem>
        <NavLink to={`/${page}`}>
          <PaginationLink>
            {page}
          </PaginationLink>
        </NavLink>
      </PaginationItem>
    )
  }
  const renderPrevLinks = () => {
    const arr = []
    for (let i = page - 1; i > ((page - 2) > 0 ? page - 2 : 0); i--) {
      arr.push(
        renderLink(i)
      )
    }
    if (page - 2 > 0 && page === SIZE) arr.push(renderLink(page - 2))
    return (arr.reverse())
  }
  const renderNextLinks = () => {
    const arr = []
    for (let i = page + 1; i < ((page + 2) < SIZE + 1 ? page + 2 : SIZE + 1); i++) {
      arr.push(
        renderLink(i)
      )
    }
    if (page + 2 <= SIZE && page === 1) arr.push(renderLink(page + 2))
    return (arr)
  }
  const handleFirst = (e: SyntheticEvent) => {
    if (page === 1) e.preventDefault()
  }
  const handleLast = (e: SyntheticEvent) => {
    if (page === SIZE) e.preventDefault()
  }
  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem disabled={page === 1}>
        <NavLink to={'/'} onClick={handleFirst}>
          <PaginationLink first disabled={page === 1}/>
        </NavLink>
      </PaginationItem>
      <PaginationItem disabled={page === 1}>
        <NavLink to={`/${page - 1}`} onClick={handleFirst}>
          <PaginationLink previous disabled={page === 1}/>
        </NavLink>
      </PaginationItem>
      {renderPrevLinks()}
      <PaginationItem active>
        <NavLink to={`/${page - 1}`} onClick={handleFirst}>
          <PaginationLink>
            {page}
          </PaginationLink>
        </NavLink>
      </PaginationItem>
      {renderNextLinks()}
      <PaginationItem disabled={page === SIZE}>
        <NavLink to={`/${page + 1}`} onClick={handleLast}>
          <PaginationLink next disabled={page === SIZE}/>
        </NavLink>
      </PaginationItem>
      <PaginationItem disabled={page === SIZE}>
        <NavLink to={`/${SIZE}`} onClick={handleLast}>
          <PaginationLink last disabled={page === SIZE}/>
        </NavLink>
      </PaginationItem>
    </Pagination>
  )
}
