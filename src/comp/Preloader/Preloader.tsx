import classes from './Preloader.module.css'
import React, { FunctionComponent } from 'react'
import { Spinner } from 'reactstrap'
export const Preloader: FunctionComponent<any> = () => {
  return (
    <div className={classes.preloadWrapper}>
      <Spinner type="grow" color="success" style={{ width: '16em', height: '16em' }}/>
    </div>
  )
}
