import React, { FunctionComponent, SyntheticEvent, useState } from 'react'
import { Button, Input } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
interface Props {
  setFilter: (filter: { substr: string | ReadonlyArray<string> | number | undefined; key: any }) => void
}
export const Filtering: FunctionComponent<Props> = ({ setFilter }) => {
  const [key, setKey] = useState('id')
  const [substr, setSubstr] = useState('')
  const handleClick = () => {
    setFilter({
      key, substr
    })
  }

  const handleSelect = (e: SyntheticEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setKey(e.target.value)
  }

  const handleInput = (e: SyntheticEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setSubstr(e.target.value)
  }
  return (
    <>
      <Input type="select" name="select" id="exampleSelect" onChange={handleSelect}>
        <option value={'id'}>ID</option>
        <option value={'firstName'}>First name</option>
        <option value={'lastName'}>Last name</option>
        <option value={'email'}>Email</option>
        <option value={'phone'}>Phone</option>
      </Input>
      <Input type="text" name="substr" placeholder="Search" onChange={handleInput}/>
      <Button color="secondary" onClick={handleClick}>
        <FontAwesomeIcon icon={['fas', 'search']} />
      </Button>
    </>
  )
}
