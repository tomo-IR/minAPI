import express from 'express';
import * as mysql from 'mysql';
// import { User } from './entity/User';
import { User } from './entity/User';
import { createConnection, getConnection, Repository, getRepository } from "typeorm";
import  ConnectionOptions  from '../src/config/orm.config'
import { UserService } from './service/user/user.service';
import { BindingScopeEnum, Container, injectable } from 'inversify';
import { nextTick } from 'process';
require('dotenv').config()

const env = process.env
let connection: mysql.Connection;
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    connection = mysql.createConnection({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_DATABASE
    });
    connection.connect();
    next();
})

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!!');
    // console.log(userService.getList());
})

app.get('/comments', (req, res) => {
    connection.query('SELECT * FROM comments', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results);
        connection.end();
    });
});

app.get('/comment/:id', (req, res) => {
    connection.query(`SELECT * FROM comments WHERE id="${req.params.id}"`, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        console.log(req.params.id)
        res.send(results);
        // connection.end();
    });


})

app.post('/comment', (req, res) => {
    const comment = req.query.comment;
    connection.query(`INSERT INTO comments (comment) VALUES ("${comment}")`, function (error, results, fields) {
        console.log(req.query.comment)
        res.send("post OK");
    })
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
