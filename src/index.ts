import express, { response } from 'express';
import * as mysql from 'mysql';
import { UserService } from './service/user/user.service';
import { AuthService } from './service/auth/auth.service'
// import { BindingScopeEnum, Container, injectable } from 'inversify';
require('dotenv').config()
import "reflect-metadata";
import { DAOConnectionManager } from './service/common/dao-connection-manager';
import { rejects } from 'assert';
import { jwt } from 'jsonwebtoken';


// const env = process.env
let connection: mysql.Connection;
// let container = new Container;
const dao = new DAOConnectionManager;
const userService = new UserService(dao);
const authservice = new AuthService(dao);
const SECRET_KEY = "secret";
const app = express();
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

// app.use((req, res, next) => {
// 	connection = mysql.createConnection({
// 		host: env.DB_HOST,
// 		user: env.DB_USER,
// 		password: env.DB_PASSWORD,
// 		database: env.DB_DATABASE
// 	});
// 	connection.connect();
// 	next();
// })

app.get('/', (req: express.Request, res: express.Response) => {
	res.send('Hello Sologol!')
})

app.get('/user/:id', (req: express.Request, res: express.Response) => {
	return userService.getUser(Number(req.params.id))
		.then((r) => {
			res.send(r)
		})
})

app.post('/login', (req: express.Request, res: express.Response) => {
	return authservice.login(String(req.query.userName), String(req.query.password))
		.then((auth) => {
			if (auth) {
				// 認証OKの場合の処理をここに書く
				// console.log(r.id)
				// res.send(r)

				const payload = {
					user: req.query.userName
				};

				const option = {
					expiresIn: '1m'
				}
				// TODO パスワードがあっていたら、tokenを発行して、クライアントに返す
				// const token = jwt.sign(payload, SECRET_KEY, option);
				// res.json({
				// 	message: "create token",
				// 	token: token
				// })
				res.send(auth)


			} else {
				res.status(401).send('Unauthorized');
			}
		})
})






app.get('/comments', (req, res) => {
	// userService.test();
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
