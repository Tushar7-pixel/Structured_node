const express = require("express");
const router = express.Router();
const { Authenticate } = require("./lib/Auth");
const middlewere = require("./lib/middlewere");

router.post("/register", Authenticate.Register);
router.post("/signIn", Authenticate.signIn);
router.get("/signOut", middlewere, Authenticate.signOut);

module.exports = router;

// 6. API endpoints which are used to send/fetch data should start with "/api/v1/"
// For Example:
// - Profile Page render endpoint: /profile
// - API to get profile data endpoint: /api/v1/profile