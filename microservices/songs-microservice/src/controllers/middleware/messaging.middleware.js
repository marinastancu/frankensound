const amqp = require('amqplib')
require('dotenv').config()
let channel, connection

module.exports = {
    connectQueue: async function () {
        try {
            connection = await amqp.connect(process.env["RABBITMQ"]);
            channel = await connection.createChannel();
            await channel.assertQueue(process.env["QUEUE"]);

        } catch (error) {
            console.log(error);
        }
    },

    sendData: async function sendData(data) {
        await channel.sendToQueue(process.env["QUEUE"], Buffer.from(JSON.stringify(data)));
        console.log(`Sent data: ${JSON.stringify(data)}`);
    }
}