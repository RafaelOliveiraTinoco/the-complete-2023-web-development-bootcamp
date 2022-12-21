const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongooseSchemas = require(__dirname + "/mongooseSchemas.js");

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const appPort = 8000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// get

app.get("/", (req, res) => {

	mongooseSchemas.Post.find({}, (error, postList) => {

		res.render("home", {postList: postList});

	});

});

app.get("/post/:postId", (req, res) => {

	mongooseSchemas.Post.findOne({_id: req.params.postId}, (error, post) => {

		if (!error){

			res.render("post", post);

		}else{

			res.redirect("/");
		
		}

	});

});

app.get("/contact", (req, res) => {

	res.render("contact", {contactContent: contactContent});

});

app.get("/about", (req, res) => {

	res.render("about", {aboutContent: aboutContent});

});

app.get("/compose", (req, res) => {

	res.render("compose");

});

// post

app.post("/compose", (req, res) => {

	new mongooseSchemas.Post({

		title: req.body.title,
		content: req.body.content,

	}).save((error) => {

		if (!error){

			res.redirect("/");

		}

	});

});

app.listen(appPort, function() {

  console.log("Server started.\nPort: " + appPort);

});
