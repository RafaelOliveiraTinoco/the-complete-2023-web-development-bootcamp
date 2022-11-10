const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
// const request = require("request");

const server = express();
server.use(express.static("pages"));
server.use(bodyParser.urlencoded({extended: true}))
const serverPort = 8000;

// GETS
server.get("/", (req, res) => {

    res.sendFile(__dirname + "/pages/signup.html");

});

// POSTS
server.post("/", (req, res) => {

    const url = "https://us8.api.mailchimp.com/3.0/lists/xxxxxxxxxx";
    const options = {
        method: "POST",
        auth: "ola:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-usx",
    }

    // add new user
    const data = {
        members: [
            {
                email_address: req.body.email,
                status: "subscribed",
                merge_fields:{
                    FNAME: req.body.nameFirst,
                    LNAME: req.body.nameLast,
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);

    const req3 = https.request(url, options, (res1) => {

        console.log(res1);

        if (res1.statusCode === 200){

            res.sendFile(__dirname + "/pages/success.html");

        }else{

            res.sendFile(__dirname + "/pages/failure.html");

        }

    });

    req3.write(jsonData);
    req3.end();

});

server.listen(process.env.PORT || serverPort, () => {

    console.log("Server is running.\nPort: " + serverPort);

});

// page link: https://shrouded-ocean-45975.herokuapp.com/