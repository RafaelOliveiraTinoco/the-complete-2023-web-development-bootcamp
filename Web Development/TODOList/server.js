const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const server = express();
const serverPort = 8000;

mongoose.connect("mongodb://localhost:27017/DBTodoList"); // connect to database

// server config
server.set("view engine", "ejs");
server.use(bodyParser.urlencoded({extended: true})); // form data to server
server.use(express.static("public"));

const Task = mongoose.model("Task", {

	name: String,

});

server.get("/", (req, res) => {

	const today = new Date();
	const listMonths = [

		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outrubro",
		"Novembro",
		"Dezembro",

	];
	const listDays = [

		"Domingo",
		"Segunda",
		"Terça",
		"Quarta",
		"Quinta",
		"Sexta",
		"Sábado",

	]

	// Get current day, month... to load in index page
	let dayWeek = listDays[today.getDay()];
	let dayNumber = today.getDate();
	let month = listMonths[today.getMonth()];

	

	Task.find({}, (error, tasks) => {

		res.render("list", {date: dayWeek + ", " + dayNumber + " " + month, todoList: tasks});

	})

});

// post
server.post("/", (req, res) => {

	if (req.body.newTodo != undefined){

		new Task({
		
			name: req.body.newTodo,

		}).save();

	}

	res.redirect("/");


});

server.post("/delete", (req, res) => {

	Task.findByIdAndDelete(req.body.taskToDelete, () => {});
	res.redirect("/");

});

server.listen(serverPort, (req, res) => {

	console.log("Server running.\nPort: " + serverPort);

});
