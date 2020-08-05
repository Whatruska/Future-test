import React, { FunctionComponent } from 'react'
import classes from './Layout.module.css'
import { Container, Row } from 'reactstrap'
import logo from '../../assets/img/logo.svg'
interface Props {
    children: React.ReactNode
}
export const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <header className={classes.header}>
        <Container>
          <Row>
            <img className={classes.logo} src={logo} alt="logo"/>
            <h1>Future test app</h1>
          </Row>
        </Container>
      </header>
      <Container>
        {children}
      </Container>
    </>
  )
}
