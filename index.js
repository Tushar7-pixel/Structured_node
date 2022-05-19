const { MongoDB } = require("./app/utils");
const connection = require("./app/router/");
require("./globals/");

MongoDB.initialize();
connection.initialize();