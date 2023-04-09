import amqp from "amqplib"
import 'dotenv/config'
import * as service from "../../services/history.service"

let channel: any, connection: any

export async function connectQueue() {
    try {

        connection = await amqp.connect(process.env["RABBITMQ"] as string);
        channel = await connection.createChannel();

        await channel.assertQueue(process.env["QUEUE"] as string);

        channel.consume(process.env["QUEUE"] as string, consumeData);

        function consumeData(data:any) {
            console.log("Data received : ", `${Buffer.from(data.content)}`);
            let content = data.content;
            service.Create(content);
            channel.ack(data);
        }

    } catch (error) {
        console.log(error);
    }
}