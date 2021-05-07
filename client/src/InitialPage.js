import { Button, Fade, Grid, IconButton, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import Chat from "./Chat";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import style from './assets/jss/initialPage'
import img from './assets/img/img.jpg'
import SmsIcon from '@material-ui/icons/Sms';
const useStyles = makeStyles(style);

export default function InitialPage (){
  const [modalColorAndName, setModalColorAndName] = useState(true)
  const [name, setName] = useState(null)
  const [color, setColor] = useState(null)

  const classes = useStyles()

  const handleClose = () =>{
    setModalColorAndName(false)
  }

  const handleSetColor = (color) =>{
    setColor(color)
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
              justify='space-between'
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
                  <div className={classes.divColor} >
                  <span style={{color: 'black'}} >Escolha a cor que deseja enviar suas mensagens: </span>
                    <IconButton onClick={() => handleSetColor('red')} className={color == 'red' ? classes.colorSelected : null}>
                      <FiberManualRecordIcon className={classes.iconRed} />
                    </IconButton>
                    <IconButton onClick={() => handleSetColor('blue')} className={color === 'blue' ? classes.colorSelected : null} >
                      <FiberManualRecordIcon className={classes.iconBlue} />
                    </IconButton>
                    <IconButton onClick={() => handleSetColor('green')} className={color === 'green' ? classes.colorSelected : null} >
                      <FiberManualRecordIcon className={classes.iconGreen} />
                    </IconButton>
                    <IconButton onClick={() => handleSetColor('yellow')} className={color === 'yellow' ? classes.colorSelected : null} >
                      <FiberManualRecordIcon className={classes.iconYellow} />
                    </IconButton>
                  </div>
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
        <Chat name={name} color={color}/>
      }
    </div>
  )



}