import React,{useEffect, useState} from "react";
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from "pusher-js";
import axios from './axios';

function App() {
  const [messages,setMessage]=useState([]);
  useEffect(()=>
  {

    axios.get('/messages/sync')
    .then(response=>{
      
      setMessage(response.data)
    });
  },[]);
  useEffect(()=>{
    var pusher = new Pusher('12da8a1bc72fd978c131', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('message');
    channel.bind('inserted', function(newMessage) {
     
      setMessage([...messages,newMessage])
    });

return()=>{
  channel.unbind_all();
  channel.unsubscribe();
}

  },[messages])
  console.log(messages)
  return (
    <div className="app">
      <div className="app__body">
      <Sidebar/>
     <Chat messages={messages}/>
      </div>
     
    </div>
  );
}

export default App;
