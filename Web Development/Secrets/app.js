// require necessary libraries
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// my modules
const mongooseModels = require(__dirname + "/mongoose/mongooseModels.js");
const encryption = require(__dirname + "/myModules/encryption.js");

// md5 encryption library
// const md5 = require("md5");

// encryption libraries
const bcrypt = require("bcrypt");
const bcryptSaltRounds = 10;

const app = express();

// app configuration
appPort = 8000;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cookieParser());

app.route("/")
    .get((req, res) => {
        res.render("home");
    })
    ;

app.route("/login")
    .get((req, res) => {
        res.render("login");
    })
    .post((req, res) => {
        // search for user in database
        mongooseModels.modelUser.findOne({email: req.body.username}, (error, user) => {
            if (error){
                console.log(error);
            }else{
                if (user){
                    bcrypt.compare(req.body.password, user.password, (error, match) => {
                        if(match){
                            res.cookie("userEmail", encryption.encrypt(req.body.username));
                            res.cookie("userPassword", encryption.encrypt(req.body.password));
                            res.redirect("/secrets");
                        }else{
                            res.redirect("/login");
                        }
                    });
                }else{
                    res.redirect("/login");
                }
            }
        });
    })
    ;

app.route("/register")
    .get((req, res) => {
        res.render("register");
    })
    .post((req, res) => {
        // hash the user password
        bcrypt.hash(req.body.password, bcryptSaltRounds, (error, hash) => {
            if(!error){
                new mongooseModels.modelUser({
                    email: req.body.username,
                    password: hash,
                }).save((error) => {
                    if (!error){
                        console.log("New User Added to Database");
                        res.cookie("userEmail", encryption.encrypt(req.body.username));
                        res.cookie("userPassword", encryption.encrypt(req.body.password));
                        res.redirect("/secrets");
                    }else{
                        console.log(error);
                        res.redirect("/register");
                    }
                });
            }else{
                console.log("An error occurred while hashing the password!\nError Message: " + error);
                res.redirect("/register");
            }
        });
    })
    ;

app.route("/secrets")
    .get((req, res) => {
        if (req.cookies.userEmail != undefined || req.cookies.userPassword != undefined){
            mongooseModels.modelUser.findOne({email: encryption.decrypt(req.cookies.userEmail)}, (error, user) => {
                if (user){
                    bcrypt.compare(encryption.decrypt(req.cookies.userPassword), user.password, (error, match) => {
                        if (match){
                            mongooseModels.modelUser.find({"secrets": {$ne: null}}, (error, users) => {
                                if (error){
                                    console.log(error)
                                    redirect("/login");
                                }else{
                                    if (users){
                                        res.render("secrets", {users: users});
                                    }else{
                                        res.render("secrets");
                                    }
                                }
                            });
                        }else{
                            res.redirect("/login");
                        }
                    });
                }else{
                    console.log(error);
                    res.redirect("/login");
                }
            });
        }else{
            res.redirect("/login");
        }
    })
    ;

app.route("/logout")
    .get((req, res) => {
        res.clearCookie("userEmail");
        res.clearCookie("userPassword");
        res.redirect("/");
    })
    ;

app.route("/submit")
    .get((req, res) => {
        if (req.cookies.userEmail != undefined || req.cookies.userPassword != undefined){
            mongooseModels.modelUser.findOne({email: encryption.decrypt(req.cookies.userEmail)}, (error, user) => {
                if (user){
                    bcrypt.compare(encryption.decrypt(req.cookies.userPassword), user.password, (error, match) => {
                        if (match){
                            res.render("submit");
                        }else{
                            res.redirect("/login");
                        }
                    });
                }else{
                    console.log(error);
                    res.redirect("/login");
                }
            });
        }else{
            res.redirect("/login");
        }
    })
    .post((req, res) => {
        if (req.cookies.userEmail != undefined || req.cookies.userPassword != undefined){
            mongooseModels.modelUser.findOne({email: encryption.decrypt(req.cookies.userEmail)}, (error, user) => {
                if (user){
                    bcrypt.compare(encryption.decrypt(req.cookies.userPassword), user.password, (error, match) => {
                        if (match){
                            if (req.body.secret != undefined && req.body.secret != ""){
                                user.secrets.push(req.body.secret);
                                user.save((error) => {});
                                res.redirect("/secrets");
                            }
                        }else{
                            res.redirect("/login");
                        }
                    });
                }else{
                    console.log(error);
                    res.redirect("/login");
                }
            });
        }else{
            res.redirect("/login");
        }
    })
    ;
// app listener
app.listen(appPort, () => {
    console.log("Server is running.\nlocalhost:" + appPort);
});