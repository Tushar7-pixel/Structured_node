const express = require("express");
const router = express.Router();
const auth = require("./Auth/index");
const admin = require("./admin/index");
const user = require("./user/index");

router.use("/auth", auth);
router.use("/user", user);
router.use("/admin", admin);

module.exports = router;