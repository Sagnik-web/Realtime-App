
import { useEffect, useState } from 'react'
import './App.css'
import {io} from "socket.io-client"
import GeoLocation from './pages/GeoLocation'

const server = io("")

function App() {

  const [val, setVal] = useState(0)
  const [data,setData] = useState([])

  const [newVal,setNewVal] = useState({val:0})
  // useEffect(()=>{
 

  function sendMessage(val) {
    setVal(val)
    server.emit("message",{val:Number(val)})
  }
  // },[val])

  server.on('chat message', (chat_data) => {
    console.log('Received from server:', chat_data);
    setNewVal(chat_data)
    // setData([...data,chat_data])

  });


  useEffect(()=>{
    setData([...data, newVal])
  },[newVal])





  return (
    <>
    <GeoLocation socket={server}/>
      <input type="number" value={val} onChange={e=>sendMessage(e.target.value)} />
      <br ></br>
      {data.map(el=>
      <p>
        {el.val}
      </p>
        )}

        
    </>
  )
}

export default App
