const dbconfig = require('./config/database');

const express = require('express');
const pg = require("pg");
const app = express();
const pool = new pg.Pool(dbconfig.connection);

app.get('/', (req, res, next) => {
   pool.connect(function (err, client, done) {
       if (err) {           console.log("Peut pas se connecter a la DB" + err);
                            res.status(400).send(err);
                }
       client.query("insert into users(username,password) values ('rrrrr','dgdgdg')",
                   function (err, result) {
		                                      done();
                            					    if (err) {console.log(err);res.status(400).send(err);}
                                          res.status(200).send(result.rows);
                                           }
                   )
                                              }
                )
});

app.listen(4000);
console.log('Server is running.. on Port 4000');
