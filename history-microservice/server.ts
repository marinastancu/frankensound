import express = require("express")
import 'dotenv/config'
import {connectQueue} from "./src/controllers/middleware/messaging.middleware"
import historyRouter from "./src/routes/history.route"
import {myDataSource} from "./data-source.js"

myDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!")
}).catch((err: any) => {
    console.error("Error during Data Source initialization:", err)
})

const app: express.Application = express();
app.use(express.json());
app.use('/history', historyRouter);

connectQueue();

app.listen(process.env["PORT"] as string, () => {
    console.log(`History microservice listening on port ${process.env["PORT"] as string}`);
})