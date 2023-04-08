import express = require("express")
import 'dotenv/config'
import {connectQueue} from "./src/controllers/middleware/messaging.middleware"

const app: express.Application = express();
app.use(express.json());

connectQueue();
app.listen(process.env["PORT"] as string, () => {
    console.log(`History microservice listening on port ${process.env["PORT"] as string}`);
})