const express = require("express");

const app = express();

const {Client} = require('pg');

const path = require('path')

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

app.use(express.static(__dirname));

app.get("/", function (req, res) {

    res.sendFile(path.join(__dirname+'/index.html'));
});


app.get('/randomSentense' , (req,res)=>{
    
     res.json(getRandomSentense()); 
 })

app.listen(3000, function () {
  console.log("Server is running on localhost3000");
});


function getRandomSentense(){
    var max = 20
    var min = 2
   
    sentence = '';
    for(let i=0; i<20; i++){
        var randomIndex =  Math.floor(Math.random() * (max - min + 1)) + min;
        sentence = sentence + a[randomIndex].word +" ";
    }
    return sentence;
}


