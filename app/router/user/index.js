const { controller } = require("./lib/Controller");
const middlewere = require("./lib/middlewere");
const express = require("express");
const router = express.Router();

router.get("/render", middlewere, controller.render);
router.put("/update", middlewere, controller.update);

module.exports = router;