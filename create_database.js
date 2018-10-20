const dbconfig = require('./config/database');

const express = require('express');
const pg = require("pg");
const app = express();
const pool = new pg.Pool(dbconfig.connection);

app.get('/login',
              function(req, res) {
                       // render the page and pass in any flash data if it exists
                       res.render('login.ejs');
                           }
              );


app.get('/', (req, res, next) => {
   pool.connect(function (err, client, done) {
       if (err) {           console.log("Peut pas se connecter a la DB" + err);
                            res.status(400).send(err);
                }
        client.query("insert into users(username,password) values($1, $2)", ['Anand', 'Karthik'],
                      function (err, result) {
                                             done();
                                             if (err) {console.log(err);res.status(400).send(err);}
                                             res.status(200).send(result.rows);
                                              }
                    );

                                              }
                )
});




app.get('/user1', (req, res, next) => {
    pool.connect(function(err, client, done) {
     const query = client.query(new pg.Query("SELECT * FROM users WHERE username = $1",['Anand']))
                          query.on('row', (row)   => { console.log(row);})
                          query.on('end', (res)   => { console.log("ending"); pool.end() })
                          query.on('error', (res) => { console.log(res); })

     done()                                   })
});

/*
app.get('/user', (req, res, next) => {
   pool.connect(function (err, client, done) {
       if (err) {           console.log("Peut pas se connecter a la DB" + err);
                            res.status(400).send(err);
                }
        var query = client.query(new pg.Query("SELECT * FROM users WHERE username = $1",['Anand']))
        query.on("row", function (row, result) {
          	 result.addRow(row);
         })
        query.on("end", function (result) {

         // On end JSONify and write the results to console and to HTML output
         console.log(result.rows);
          	//res.writeHead(200, {'Content-Type': 'text/plain'});
          	//res.write(JSON.stringify(result.rows) + "\n");
          res.end();
        });
                                              }
                )
});*/

app.listen(4010);
console.log('Server is running.. on Port 4000');
