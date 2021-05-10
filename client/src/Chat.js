import React, { useEffect, useRef, useState } from 'react'
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

const Chat = (props) => {
  const [message, updateMessage] = useState('')
  const [messages, updateMessages] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const {name, color} = props
  const classes = useStyles()
  const ref = useRef();

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
          message
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
            <span style={{fontSize: '15px'}} className={`message ${m.id === myId ? color : 'other'}`}>
              {m.id === myId ?
                null
              : <span className={classes.spanName} > {m.name}</span> }
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
