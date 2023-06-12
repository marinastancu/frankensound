const express = require("express")
require('dotenv').config()
const {connectQueue} = require("./src/controllers/middleware/messaging.middleware")
const songRouter = require("./src/routes/song.route")

const app = express();
app.use(express.json());
app.use('/songs', songRouter);

connectQueue();

app.listen(process.env["PORT"], () => {
    console.log(`Songs microservice listening on port ${process.env["PORT"]}`)
})

exports.express = express;