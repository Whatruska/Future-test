import preloader from '../../assets/gif/Preloader.gif'
import classes from '*.module.css'
import React from 'react'
export default function Preload () {
  return (
    <div className={classes.preloadWrapper}>
      <img src={preloader} alt="Preloader"/>
    </div>
  )
}
