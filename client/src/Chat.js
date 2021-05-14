import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import uuid from 'uuid/v4'

import 'emoji-mart/css/emoji-mart.css'
import {Picker} from 'emoji-mart'

import { Button, 
  IconButton, 
  makeStyles, 
  TextField} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';

import style from './assets/jss/chat'

const useStyles = makeStyles(style);

const myId = uuid()
const socket = io('http://localhost:8080')
socket.on('connect', () => console.log('[IO] Connect => A new connection has been established'))

const colors = ["#fff","#FF2000","#4025DA","#1336EC","#DC23C5","#093114","#4C0403","#810349"];
const chatColor = colors[Math.floor(Math.random() * colors.length)];
//console.log(colors.length);

 // const chatColor = "#" + Math.floor(Math.random()*16777215).toString(16);

const Chat = (props) => {

/*
  function randDarkColor() {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
  }

  const chatColor = randDarkColor();*/

  const [message, updateMessage] = useState('')
  const [messages, updateMessages] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const {name} = props
  const classes = useStyles()

  useEffect(() => {
    const handleNewMessage = newMessage =>
      updateMessages([...messages, newMessage])
      socket.on('chat.message', handleNewMessage)
      return () => socket.off('chat.message', handleNewMessage)
  }, [messages])

  const handleFormSubmit = event => {
    event.preventDefault()
    if (message.trim()) {
      socket.emit('chat.message', {
          id: myId,
          name: name,
          message,
          chatColor
      })
      updateMessage('')
    }
  }

  const handleInputChange = event =>
    updateMessage(event.target.value)
  
  const addEmoji = e => {
    let sym = e.unified.split('-')
    let codesArray = []
    sym.forEach(el => codesArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codesArray)
    updateMessage(message + emoji)
  }

  const handleSetEmojis = e =>{
    setIsOpen(!isOpen)
  }

  return (
    <main className="container">
      <ul className="list">
        { messages.map((m, index) => (
          <li
            className={`list__item list__item--${m.id === myId ? 'mine' : 'other'}`}
            key={index}
          >
            <span style={{fontSize: '15px'}} className={`message ${m.id === myId ? 'mine' : 'other'}`}>
              {m.id === myId ?
                null
              : <span style={{color: m.chatColor}} className={classes.spanName} > {m.name}</span> }
                {m.message}
            </span>
          </li>
        ))}
      </ul>
      <form className="form" onSubmit={handleFormSubmit} autoComplete={false}  >
        <IconButton onClick={handleSetEmojis}>
          <SentimentSatisfiedOutlinedIcon fontSize='small' />
          {isOpen ? 
            <Picker set="apple"
              className={classes.openEmoji} 
              onSelect={addEmoji}
              autoFocus={isOpen} 
            /> 
          : null}
        </IconButton>
        <TextField
          className="formField"
          onChange={handleInputChange}
          placeholder="Digite uma mensagem"
          type="text"
          value={message}
        />
        <Button onClick={handleFormSubmit} > 
          <SendIcon fontSize='medium' />
        </Button>
      </form>
    </main>
  )
}

export default Chat
