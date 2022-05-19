const path = require("path");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./route");

function connection() {}

connection.prototype.initialize = () => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ extended: true }));
    app.use(
        session({
            secret: "secret-key",
            resave: false,
            saveUninitialized: false,
            cookie: {
                expires: 600000,
            },
        })
    );
    app.listen(3000, () => {
        app.use("/api/v1/", routes);
        console.log("Server Started");
    });
};

module.exports = new connection();