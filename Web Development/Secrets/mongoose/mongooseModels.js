// require("dotenv").config();
const mongoose = require("mongoose");
// const encryption = require("mongoose-encryption");
// const secret = process.env.DATABASE_ENCRYPTION_KEY;

mongoose.connect("mongodb://127.0.0.1:27017/db_secret", {useNewUrlParser: true});

// schemas creation
const schemaUser = new mongoose.Schema({
    email: String,
    password: String,
    secrets: [String],
});

// schemas plugins
/*schemaUser.plugin(encryption, {
    secret: secret,
    encryptedFields: ["password"]
});*/

// models creation
exports.modelUser = mongoose.model("User", schemaUser);