const express = require('express')
const app = express()
const port = 4000
app.use(express.json());

const amqp = require("amqplib");
var channel, connection;

connectQueue() // call connectQueue function
async function connectQueue() {
    try {

        connection = await amqp.connect("amqp://localhost:5672");
        channel = await connection.createChannel()

        // connect to 'test-queue', create one if doesnot exist already
        await channel.assertQueue("test-queue")

        channel.consume("test-queue", data => {
            // console.log(data)
            console.log("Data received : ", `${Buffer.from(data.content)}` );
            channel.ack(data)
        })

    } catch (error) {
        console.log(error)
    }
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})