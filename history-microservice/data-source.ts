import {DataSource} from "typeorm"
import {HistoryEntity} from "./src/entities/history.entity.js"
import "dotenv/config"

export const myDataSource = new DataSource({
    type: "postgres",
    host: process.env["DB_HOST"],
    port: process.env["DB_PORT"] as undefined,
    username: process.env["DB_USER"],
    password: process.env["DB_PASS"],
    database: process.env["DB_NAME"],
    entities: [HistoryEntity],
    logging: true,
    synchronize: true,
})