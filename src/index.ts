import express from 'express';
import * as mysql from 'mysql';


const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!!');
})

//一部追記
app.get('/comments', (req, res) => {
    const connection = mysql.createConnection({
        host:  'localhost',
        user: 'root',
        password: '', 
        database: 'sampledb'
    });
    connection.connect();
    connection.query('SELECT * FROM comments', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.json(results)
        res.send(results); //追記
        connection.end();
    });
});

app.get('/comment/:id', (req, res)=>{
    const connection = mysql.createConnection({
        host:  'localhost',
        user: 'root',
        password: '', 
        database: 'sampledb'
    });
    connection.connect();
    connection.query(`SELECT * FROM comments WHERE id="${req.params.id}"`, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        console.log(req.params.id)
        res.send("OK");
        connection.end();
    });


})

app.post('/comment',(req, res)=>{
    const connection = mysql.createConnection({
        host:  'localhost',
        user: 'root',
        password: '', 
        database: 'sampledb'
    });
    connection.connect();
    const comment = req.query.comment;
    connection.query(`INSERT INTO comments (comment) VALUES ("${comment}")`, function(error, results, fields){
        console.log(req.query.comment)
        res.send("post OK");

    })

})

//追記
app.listen(3000, function () {
    console.log('Example app listening on port 3000!'); 
});
