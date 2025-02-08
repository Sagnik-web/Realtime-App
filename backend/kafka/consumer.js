// const { kafka } = require("./client");

// const consumer = kafka.consumer({ groupId: group });

async function initConsumer(consumer) {
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

module.exports = initConsumer

