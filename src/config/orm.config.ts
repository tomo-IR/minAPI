import { ConnectionOptions } from "typeorm";
import { User } from "../service/user/entity/User";
import { MysqlConnectionCredentialsOptions } from "typeorm/driver/mysql/MysqlConnectionCredentialsOptions";

// const slaves: MysqlConnectionCredentialsOptions[] = [];

export default {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        User
    ],
    synchronize: true,
    logging: false
}as ConnectionOptions;