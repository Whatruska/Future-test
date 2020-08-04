import React, { FunctionComponent } from 'react'
import { User } from '../../types/types'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { TABLE_SIZE } from '../UserTable/UserTableContainer'
interface Props {
    list: Array<User>,
    page: number,
    setPage: (num: number) => void
}
export const CustomPagination: FunctionComponent<Props> = ({ page, list, setPage }) => {
  const SIZE = Math.ceil(list.length / TABLE_SIZE)
  const renderLink = (page: number) => {
    return (
      <PaginationItem onClick={() => setPage(page)}>
        <PaginationLink>
          {page}
        </PaginationLink>
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
  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem disabled={page === 1} onClick={() => {
        if (page > 1) setPage(1)
      }}>
        <PaginationLink first disabled={page === 1}/>
      </PaginationItem>
      <PaginationItem disabled={page === 1} onClick={() => {
        if (page > 1) setPage(page - 1)
      }}>
        <PaginationLink previous disabled={page === 1}/>
      </PaginationItem>
      {renderPrevLinks()}
      <PaginationItem active>
        <PaginationLink>
          {page}
        </PaginationLink>
      </PaginationItem>
      {renderNextLinks()}
      <PaginationItem disabled={page === SIZE} onClick={() => {
        if (page < SIZE) setPage(page + 1)
      }}>
        <PaginationLink next disabled={page === SIZE}/>
      </PaginationItem>
      <PaginationItem disabled={page === SIZE} onClick={() => {
        if (page < SIZE) setPage(SIZE)
      }}>
        <PaginationLink last disabled={page === SIZE}/>
      </PaginationItem>
    </Pagination>
  )
}
