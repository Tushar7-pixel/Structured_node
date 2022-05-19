const { MongoDBNamespace } = require("mongodb");
const mongoose = require("mongoose");



function MongoDB() {}

MongoDB.prototype.initialize = async function() {
    const ConnectionURL = "mongodb://127.0.0.1:27017/Node";
    mongoose.connect(ConnectionURL, { useNewUrlParser: true });
    const con = mongoose.connection;
    con.on("open", () => {
        console.log("connected");
    });
}


module.exports = new MongoDB();