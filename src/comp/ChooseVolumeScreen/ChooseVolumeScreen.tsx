import React, { FunctionComponent } from 'react'
import { FetchingVolume } from '../../types/types'
import { Button } from 'reactstrap'
import classes from './ChooseVolumeScreen.module.css'

interface Props {
    setVolume: (volume: FetchingVolume) => void
}
export const ChooseVolumeScreen: FunctionComponent<Props> = ({ setVolume }) => {
  return (
    <div className={classes.chooseWrapper}>
      <div className={classes.title}>
        <h2>Choose volume</h2>
      </div>
      <div className={classes.fetchChoose}>
        <Button color={'success'} className={classes.succBtn} onClick={() => setVolume(FetchingVolume.SMALL)}>Small volume</Button>
      </div>
      <div className={classes.fetchChoose}>
        <Button color={'success'} className={classes.succBtn} onClick={() => setVolume(FetchingVolume.BIG)}>Big volume</Button>
      </div>
    </div>
  )
}
