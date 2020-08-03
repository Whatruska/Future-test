import preloader from '../../assets/gif/Preloader.gif'
import classes from './Preloader.module.css'
import React, { FunctionComponent } from 'react'
export const Preload: FunctionComponent<any> = () => {
  return (
    <div className={classes.preloadWrapper}>
      <img src={preloader} alt="Preloader"/>
    </div>
  )
}
