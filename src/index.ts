import express from 'express';
import * as mysql from 'mysql';
// import { User } from './entity/User';
import { User } from './entity/User';
import { createConnection, getConnection, Repository, getRepository } from "typeorm";
import  ConnectionOptions  from '../src/config/orm.config'
import { UserService } from './service/user/user.service';
import { BindingScopeEnum, Container, injectable } from 'inversify';
require('dotenv').config()

const env = process.env


const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// let container: Container;
// container = new Container({
//     autoBindInjectable: true,
//     defaultScope: BindingScopeEnum.Singleton
//   });
// let userService = container.get(UserService);

// const readUser = async (userRepository: Repository<User>) => {
//     console.log(process.env.DB_TYPE)
//     console.log("### Read ###")

//     const users = await userRepository.find()
//     console.log(`All Users: ${JSON.stringify(users)}`)
// }
// (async () => {
//     const connection = await createConnection()
//     const userRepository = getRepository(User)
//     await readUser(userRepository)
//     await connection.close()
// })()



app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!!');
    // console.log(userService.getList());
})

//一部追記
app.get('/comments', (req, res) => {
    const connection = mysql.createConnection({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_DATABASE
    });
    connection.connect();
    
    connection.query('SELECT * FROM comments', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results); //追記
        connection.end();
    });
});

app.get('/comment/:id', (req, res) => {
    const connection = mysql.createConnection({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_DATABASE
    });
    connection.connect();
    connection.query(`SELECT * FROM comments WHERE id="${req.params.id}"`, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        console.log(req.params.id)
        res.send(results);
        // connection.end();
    });


})

app.post('/comment', (req, res) => {
    const connection = mysql.createConnection({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_DATABASE
    });
    connection.connect();
    const comment = req.query.comment;
    connection.query(`INSERT INTO comments (comment) VALUES ("${comment}")`, function (error, results, fields) {
        console.log(req.query.comment)
        res.send("post OK");

    })

})

//追記
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
