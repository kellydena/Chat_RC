import { Grid, IconButton, makeStyles, Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Chat from "./Chat";

import style from './assets/jss/initialPage'

const useStyles = makeStyles(style);


export default function InitialPage (){
  const [modalColorAndName, setModalColorAndName] = useState(true)
  const classes = useStyles()

  useEffect(() =>{
    
  })

  const handleClose = () =>{
    
    console.log('close')
  }

  const handleColor = () =>{
    console.log('color')
  }

  return(
    <div id='root' style={{background: 'blue'}}>
      {modalColorAndName ?
      <Grid
        id='container'
        container
        direction='column'
        justify='space-between'
        justify='center'
        style={{background: 'red'}}
      >
        <Modal 
          title='Escolha a cor que deseja enviar as mensagens'
          open={modalColorAndName}
          onClose={handleClose}
          className={classes.modal}
          style={{position: 'absolute', zIndex: 'inherit'}}
          >
          <IconButton>
            <RadioButtonUncheckedIcon />
          </IconButton>


        </Modal>
          </Grid>
      : 
        <Chat/>
      }
    </div>
  )



}