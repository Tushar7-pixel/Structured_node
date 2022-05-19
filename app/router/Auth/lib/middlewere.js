const session = require("express-session");
const userData = require("../../../models/");
const { validator } = require("./validators");

// ----------------------------------------------------------------Authenticate-----------------------------------------------

const authenticate = async(req, res, next) => {
    // let token = req.session.token;
    let token = req.headers.token;

    // -----------------------Checking Session-------------------------------
    if (token == undefined) {
        return res.send(messages.expired("[Please Log-in First],Session is"));
    }

    // -------------------------------Decoding Token---------------------

    let base64Url = token.split(".")[1];
    let base64 = JSON.parse(atob(base64Url));
    console.log(base64.email);

    // ----------------------------Validating in database--------------------------------
    var userInfo = await userData.find({ email: base64.email });
    console.log(userInfo);
    if (userInfo.length < 1) {
        return res.send(messages.not_found("User"));
    }
    // ------------------------------------Comparing Data in Session----------------
    if (base64.email != req.session.email || base64.uType != req.session.uType) {
        return res.send(messages.unauthorized(""));
    }

    next();
};

module.exports = authenticate;