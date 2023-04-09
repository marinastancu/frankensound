import {DataSource} from "typeorm"
import {Song} from "./src/entities/song.entity.js"
import "dotenv/config"

export const myDataSource = new DataSource({
    type: "postgres",
    host: process.env["DB_HOST"],
    port: process.env["DB_PORT"] as undefined,
    username: process.env["DB_USER"],
    password: process.env["DB_PASS"],
    database: process.env["DB_NAME"],
    entities: [Song],
    logging: true,
    synchronize: true,
})