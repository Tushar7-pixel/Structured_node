const express = require("express");
const router = express.Router();
const middlewere = require("./lib/middlewere");
const { controller } = require("./lib/Controller");


router.post('/renderData', middlewere, controller.renderAll)

module.exports = router;