const http = require('http')
const app = require('./app')
const socketIO = require('socket.io')
const server = http.createServer(app)
const { kafka } = require("./kafka/client");
// const initConsumer = require("./kafka/consumer")
// const producerCall = require("./kafka/producer")

const io = socketIO(server, {
    cors: {
      origin: "http://localhost:5173", // The frontend URL
    //   methods: ["GET", "POST"]
    }})


const producer = kafka.producer();
producer.connect();



io.on('connection', (socket)=>{
    console.log("user connected successfully")
  

    socket.on('message',async data=>{
        // console.log(data);

        await producer.send({
            topic: "rider-updates",
            messages: [
              {
                partition: 0 ,
                key: "location-update",
                value: JSON.stringify(data),
              },
            ],
        });
    
       
    })

    socket.on("geo-location",data=>{
      console.log(data);
      
    })


    socket.on('disconnect',()=>{
        console.log("User disconnected.");
        
    })
})



const consumer = kafka.consumer({ groupId: "up" });

async function init() {
  await consumer.connect();

  await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });

    
  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(
        // `${group}: [${topic}]: PART:${partition}:`,
        JSON.parse(message.value.toString())
      );
      io.emit('chat message',JSON.parse(message.value.toString()))
      
    },
  });


}

init().catch(console.error);


const port = 5000
server.listen(port,()=>{
    console.log(`Server is running on port ${port}...`);
})

