import React, { useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined
} from "@material-ui/icons";
import MicIcon from '@material-ui/icons/Mic';
import "./Chat.css";
import axios from './axios';

function Chat({messages}) {
  const [input,setInput] =useState("");

  const sendMessage = async (e)=>{
    e.preventDefault();
   await axios.post('/messages/new',{
      message:input,
      name:"demo app",
      timestamp:"just now",
      received:true,
    })
    setInput('');
  }
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last seeen at...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message)=>(
 <p className={`chat__message ${message.received && "chat__receiver"}`}>
 <span className="chat__name">{message.name}</span>
 {message.message}
 <span className="chat__timestamp">{message.timestamp}</span>
</p>

        ))}
       
        {/* <p className="chat__message chat__receiver">
          <span className="chat__name">Sunny</span>
          this is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p> */}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="type a message" type="text" />
          <button onClick={sendMessage} type="submit">send a message</button>
        </form>
       <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
