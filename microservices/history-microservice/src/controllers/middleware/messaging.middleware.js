const amqp = require('amqplib')
require('dotenv').config()
const service = require("../../services/history.service")

let channel, connection

module.exports = {
    connectQueue: async function () {
        try {

            connection = await amqp.connect(process.env["RABBITMQ"]);
            channel = await connection.createChannel();

            await channel.assertQueue(process.env["QUEUE"]);

            channel.consume(process.env["QUEUE"], consumeData);

            function consumeData(data) {
                console.log("Data received : ", `${Buffer.from(data.content)}`);
                let record = JSON.parse(Buffer.from(data.content).toString());
                service.Create(record);
                channel.ack(data);
            }

        } catch (error) {
            console.log(error);
        }
    }
}