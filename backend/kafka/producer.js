
async function producerCall(producer,val){
    await producer.send({
        topic: "rider-updates",
        messages: [
          {
            partition: 0 ,
            key: "location-update",
            value: JSON.stringify({ val }),
          },
        ],
    });

}

module.exports = producerCall