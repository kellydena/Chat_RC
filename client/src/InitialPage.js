import React, {useState } from "react";

import { Button, 
  Fade, Grid, 
  makeStyles, 
  TextField, 
  Typography } from "@material-ui/core";
import SmsIcon from '@material-ui/icons/Sms';

import Chat from "./Chat";

import img from './assets/img/img.jpg'
import style from './assets/jss/initialPage'

const useStyles = makeStyles(style);

export default function InitialPage (){
  const [modalColorAndName, setModalColorAndName] = useState(true)
  const [name, setName] = useState(null)

  const classes = useStyles()

  const handleClose = () =>{
    setModalColorAndName(false)
  }

  const handleSetName = (event) =>{
    const value = event.target.value
    setName(value)
  }

  return(
    <div id='root' style={{width: '100%'}}>
      {modalColorAndName ?
       <div id='wrapper' className={classes.wrapper}>
          <div id='full' className={classes.fullPage}
            style={{ backgroundImage: "url(" + img + ")" }} >
            <Grid
              id='container'
              container
              direction='column'
              justify='center'
            >
              <div
                className={classes.modal}
                style={{zIndex: 'inherit'}}
              >
                <Fade in={modalColorAndName} 
                  className={classes.fadeStyle}
                >
                  <div>
                    <Typography className={classes.typography} >
                      Dados necessários para iniciar uma conversa:
                    </Typography>
                  <div>
                  <div>
                    <TextField 
                      onChange={(e) => handleSetName(e)} 
                      label="Nome"  
                      className={classes.inputName}
                    />
                  </div>
                  </div>
                  <Button 
                    variant='outlined'
                    disabled={!(color && name)}
                    onClick={handleClose}
                    className={classes.button}
                  >
                    <SmsIcon />
                    Ir para conversa
                  </Button>
                  </div>
                </Fade>
              </div>
            </Grid>
          </div>
        </div>
      : 
        <Chat name={name} />
      }
    </div>
  )
}