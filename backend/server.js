const http = require('http')
const app = require('./app')
const socketIO = require('socket.io')
const server = http.createServer(app)


const io = socketIO(server, {
    cors: {
      origin: "http://localhost:5173", // The frontend URL
    //   methods: ["GET", "POST"]
    }})

io.on('connection',(socket)=>{
    console.log("user connected successfully")

    socket.on('message',data=>{
        console.log(data);
        
    })


    socket.on('disconnect',()=>{
        console.log("User disconnected.");
        
    })
})


const port = 5000
server.listen(port,()=>{
    console.log(`Server is running on port ${port}...`);
})

