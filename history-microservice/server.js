const express = require("express")
require('dotenv').config()
const {connectQueue} = require("./src/controllers/middleware/messaging.middleware")
const historyRouter = require("./src/routes/history.route")
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(process.env["DB_NAME"], process.env["DB_USER"], process.env["DB_PASS"], {
    host: process.env["DB_HOST"],
    dialect: 'postgres'
});

const app = express();
app.use(express.json());
app.use('/history', historyRouter);

async function ConnectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

ConnectToDatabase();

connectQueue();

app.listen(process.env["PORT"], () => {
    console.log(`History microservice listening on port ${process.env["PORT"]}`);
})

exports.express = express;