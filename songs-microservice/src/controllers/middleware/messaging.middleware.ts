import amqp from "amqplib"
import 'dotenv/config'
let channel: any, connection: any

export async function connectQueue() {
    try {
        connection = await amqp.connect(process.env["RABBITMQ"] as string);
        channel = await connection.createChannel();
        await channel.assertQueue(process.env["QUEUE"] as string);

    } catch (error) {
        console.log(error);
    }
}

export async function sendData(data: any) {
    await channel.sendToQueue(process.env["QUEUE"], Buffer.from(JSON.stringify(data)));
    console.log(`Sent data: ${JSON.stringify(data)}`);
}