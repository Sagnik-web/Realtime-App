
import { useEffect, useState } from 'react'
import './App.css'
import {io} from "socket.io-client"

const server = io("http://localhost:5000")

function App() {

  const [val, setVal] = useState(0)


  // useEffect(()=>{
  server.emit("message",{val:Number(val)})
  // },[val])

  return (
    <>
     <input type="number" value={val} onChange={e=>setVal(e.target.value)} />
    </>
  )
}

export default App
