import React from 'react'
import { makeStyles } from '@material-ui/core';

import InitialPage from "./InitialPage";

import style from './assets/jss/admin'
import img from './assets/img/RcImg.jpg'

const useStyles = makeStyles(style);

export default function Admin (){
  const classes = useStyles()

  return(
    <div id='wrapper' className={classes.wrapper}>
      <div id='full' className={classes.fullPage}
        style={{ backgroundImage: "url(" + img + ")" }} >
        <InitialPage />
      </div>
    </div>
  )

}