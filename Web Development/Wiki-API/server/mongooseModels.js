const mongoose = require("mongoose");

const database = "db_wiki";

mongoose.connect("mongodb://127.0.0.1:27017/" + database, {useNewUrlParser: true});

// mongoose schemas
schemaArticle = new mongoose.Schema({
    title: String,
    content: String,
});

// mongoose models
exports.modelArticle = mongoose.model("Article", schemaArticle);

// tests zone



// tests zone