import { ConnectionOptions } from "typeorm";
import { User } from "../entity/User";
import { MysqlConnectionCredentialsOptions } from "typeorm/driver/mysql/MysqlConnectionCredentialsOptions";
require('dotenv').config()

// const slaves: MysqlConnectionCredentialsOptions[] = [];
const env = process.env

export default {
    type: env.DB_TYPE,
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    entities: [
        User
    ],
    synchronize: true,
    logging: false
}as ConnectionOptions;