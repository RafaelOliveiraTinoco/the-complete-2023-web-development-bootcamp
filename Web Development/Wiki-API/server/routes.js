const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongooseModels = require(__dirname + "/mongooseModels.js")

// global constants
const app_port = 8000;

// app configure
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// app routes
app.route("/articles")
    .get(async (req, res) => {
        const articles = await mongooseModels.modelArticle.find({});
        res.send(articles);
    })
    .post((req, res) => {
        new mongooseModels.modelArticle({
            title: req.body.title,
            content: req.body.content,
        }).save((error) => {
            if (!error){
                res.send("Article added successfully!")
            }else{
                res.send("An error occured");
                console.log("Erro while adding new article!\nError message:\n" + error);
            }
        });
    })
    .delete((req, res) => {
        mongooseModels.modelArticle.deleteMany({}, (error) => {
            if (!error){
                res.send("Successfully deleted all articles")
            }else{
                res.send("An error occured");
                console.log("Error while deleting all articles\nError message:\n" + error);
            }
        });
    })
    ;

app.route("/articles/:articleTitle")
    .get(async (req, res) => {
        const article = await mongooseModels.modelArticle.findOne({title: req.params.articleTitle});
        res.send(article);
    })
    .put((req, res) => {
        mongooseModels.modelArticle.update(
            {title: req.params.articleTitle},
            {title: req.body.title, content: req.body.content},
            {overwrite: true},
            (error) => {
                if (!error){
                    res.send("Article updated successfully!");
                }
                else{
                    res.send("An error occured");
                    console.log(error);
                }
            }
        );
    })
    .patch((req, res) => {
        mongooseModels.modelArticle.update(
            {title: req.params.articleTitle},
            {title: req.body.title, content: req.body.content},
            (error) => {
                if (!error){
                    res.send("Successfully updated article");
                }
                else{
                    res.send("An error occured");
                    console.log(error);
                }
            }
        );
    })
    .delete((req, res) => {
        mongooseModels.modelArticle.deleteOne(
            {title: req.params.articleTitle},
            (error) => {
                if (!error){
                    res.send("Successfully deleted the Article!");
                }
                else{
                    res.send("An error occured");
                    console.log(error);
                }
            }
        );
    })
    ;

// app listener
app.listen(app_port, () => {
    console.log("Server started.\nPort: " + app_port);
});