const express = require("express");

const app = express();

const {Client} = require('pg');

const bodyParser = require('body-parser')

const client = new Client({
    host: 'database-1.coen2gah75bx.us-east-1.rds.amazonaws.com',
    port: 5432,
    user: 'postgres',
    password: 'postgrespwd',
    database: 'TypingWords'
});

client.connect();

var a = [];

client.query(`SELECT * FROM Public."words"`, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    a=res.rows;
    client.end();
});

app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: true })); 

app.set('view engine', 'ejs');

app.get("/", function (req, res) {

    sentence = '';
    console.log(a);
    for(let i of a){
        sentence = sentence + i.word +" ";
    }
    res.render('base',{title: "speed it" ,  data:sentence})
  
});


app.listen(3000, function () {
  console.log("Server is running on localhost3000");
});





