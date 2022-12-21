const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/DBBlog");

// Schemas
const schemaPost = mongoose.Schema({

	title: {type: String, required: true},
	content: {type: String, required: true},

});

// Models
const Post = mongoose.model("Post", schemaPost);

module.exports = {

	Post: Post,

};
