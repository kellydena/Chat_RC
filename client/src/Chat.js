import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import uuid from 'uuid/v4'

import 'emoji-mart/css/emoji-mart.css'
import {Picker} from 'emoji-mart'
import { Button, IconButton, TextField } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const myId = uuid()
const socket = io('http://localhost:8080')
socket.on('connect', () => console.log('[IO] Connect => A new connection has been established'))

const Chat = () => {
    const [message, updateMessage] = useState('')
    const [messages, updateMessages] = useState([])
    const ref = useRef();
    const [isOpen, setIsOpen] = useState(false);

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
              <AccountCircleIcon fontSize='small' />
              <span className={`message message--${m.id === myId ? 'mine' : 'other'}`}>
                  { m.message }
              </span>
            </li>
          ))}
        </ul>
          <form className="form" onSubmit={handleFormSubmit} autoComplete={false}  >
            <TextField
              className="formField"
              onChange={handleInputChange}
              placeholder="Digite uma mensagem"
              type="text"
              value={message}
            >
              </TextField>
              <IconButton onClick={handleSetEmojis}>
                <SentimentSatisfiedOutlinedIcon fontSize='small' />
                {isOpen ? 
                  <Picker set="apple"
                    style={{
                      position: 'absolute',
                      zIndex: 1000,
                      bottom: '50px',
                  }} 
                  onSelect={addEmoji}
                  autoFocus={isOpen} /> 
                : null}
              </IconButton>
              <Button  onClick={handleFormSubmit} > 
                  <SendIcon fontSize='small' />
                  Enviar
              </Button>
          </form>
      </main>
    )
}

export default Chat
