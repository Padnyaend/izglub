// app/routes.js

const dbconfig = require('./database');

const express = require('express');
const pg = require("pg");
const app = express();
const pool = new pg.Pool(dbconfig.connection);

function isLoggedIn(req, res, next)      // route middleware to make sure
{
                                 	 // if user is authenticated in the session, carry on
	                                if (req.isAuthenticated())	return next();

                                 	 // if they aren't redirect them to the home page
                                	res.redirect('/');
}


module.exports = function(app) //, passport)
{

	// HOME PAGE (with login links) ========
	app.get('/',
          function(req, res) { res.render('index.ejs'); }
          );

	// LOGIN ===============================
	app.get('/login',
           function(req, res) { res.render('login.ejs', {message: req.flash('msg')});	}
          );

	// SIGNUP ==============================
	app.get('/signup',
            function(req, res) { res.render('signup.ejs',
						                                { message: req.flash('signupMessage') }
																					);
																}
          );

/*
	// process the login form
	app.post('/login',
           function(req, res) {
																 // validate the input
																 req.checkBody('username', 'Username is required').notEmpty();
																 req.checkBody('password', 'Password is required').notEmpty();
																 //req.checkBody('email', 'Email is required').notEmpty();
																 //req.checkBody('email', 'Email does not appear to be valid').isEmail();

																 // check the validation object for errors
																 var errors = req.validationErrors();

																 console.log(errors);

																 if (errors) {
																	 res.render('register', { flash: { type: 'alert-danger', messages: errors }});
																 }
																 else {
																	 res.render('register', { flash: { type: 'alert-success', messages: [ { msg: 'No errors!' }]}});
																 }
																if (req.body.remember) {req.session.cookie.maxAge = 1000 * 60 * 3;}
																                  else {req.session.cookie.expires = false;}
												        res.redirect('/');
                            }
        );

*/

	// process the signup form
	app.post('/signup',
								(req, res, next) => {
									 //console.log(req.body);
									 //console.log(req.sessionID);
									 //console.log(req.cookies);

									 // username must be an email
									 //check('').isEmail(),
									 // password must be at least 5 chars long
									 //check('password').isLength({ min: 5 })
									 req.checkBody('username', 'Введите адрес электронной почты').notEmpty();
									 req.checkBody('username', 'Введите пароль').notEmpty();
									 req.checkBody('username', 'Некорректный адрес электронной почты').isEmail();
                   req.checkBody('password', 'Пароль должен быть не менее 5 символов').isLength({ min: 5 });


									 // check the validation object for errors
								   var errors = req.validationErrors();

								   console.log(errors);
                   /*
									 app.post('/login',function(req,res){
									  User.findOne({username:req.body.user.username},function(err,info){
									  if(err){
									    req.flash('error','There was an error on our end. Sorry about that.');
									    res.redirect('/');
									  }

									  if(info==null){
									    req.flash('error', 'Incorrect Username. Please try again, or make an account');
									    res.redirect('/login');
									  }
									  else{
									    if(req.body.user.password==info.password){
									      res.redirect('/users/' + info.username);
									    }
									    else{
									      req.flash('error', 'Incorrect Password');
									      res.redirect('/login');
									    }
									  }
									});
									});*/

                  if (errors) { req.flash('signupMessage','There was an error on our end. Sorry about that.');
                                res.redirect('/signup');
															}
									/*
                  else {

											   pool.connect(function (err, client, done) {
											       if (err) {           console.log("Peut pas se connecter a la DB" + err);
											                            res.status(400).send(err);
											                }
											        client.query("insert into users(username,password) values($1, $2)",
															             [req.body.username, req.body.password],
											                      function (err, result) {
											                                             done();
											                                             if (err) {console.log(err);res.status(400).send(err);}
											                                             res.status(200).send(result.rows);
											                                              }
											                    );

											                                              }
											                )
											  }   */
								}

           );

	// PROFILE SECTION =========================

	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile',
                isLoggedIn,
                function(req, res) { // get the user out of session and pass to template
		                     res.render('profile.ejs', {user : req.body.username });
                           	   }
               );


	// LOGOUT ==============================
	app.get('/logout',
                function(req, res) {
																			req.session.destroy();
										                  res.send("logout success!");
																			return done(null, false, { message: 'Logout' });
																		  req.logout();
																			res.redirect('/');
																		}
         );

};
