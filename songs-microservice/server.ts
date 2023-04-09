import express = require("express")
import songsRouter from "./src/routes/songs.route.js"
import {connectQueue} from "./src/controllers/middleware/messaging.middleware.js"
import "dotenv/config"
import {myDataSource} from "./data-source.js"

myDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!")
}).catch((err:any) => {
    console.error("Error during Data Source initialization:", err)
})

const app = express();
app.use(express.json());
app.use('/songs', songsRouter);
connectQueue();

app.listen(process.env["PORT"], () => {
    console.log(`Songs microservice listening on port ${process.env["PORT"]}`)
})