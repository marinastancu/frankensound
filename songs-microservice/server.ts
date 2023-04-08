import express = require("express")
import songsRouter from "./src/routes/songs.route"
import {connectQueue} from "./src/controllers/middleware/messaging.middleware"
import 'dotenv/config'

const app: express.Application = express();
app.use(express.json())

app.use('/songs', songsRouter);
connectQueue();

app.listen(process.env["PORT"] as string, () => {
    console.log(`Songs microservice listening on port ${process.env["PORT"] as string}`)
})