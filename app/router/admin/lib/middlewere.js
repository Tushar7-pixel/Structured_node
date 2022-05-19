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

    // console.log(base64.email);
    var userInfo = await userData.findOne({ email: base64.email });
    // console.log(userInfo);
    // ------------------------------------Comparing Data in Session----------------
    // console.log(`--------------------
    // ${userInfo.email} == ${req.session.email}
    // ${userInfo.uType} == ${req.session.uType}
    //         -------------------- `);

    if (
        userInfo.email != req.session.email ||
        userInfo.uType != req.session.uType ||
        base64.uType != "admin" ||
        base64.uType == "user"
    ) {
        return res.send(messages.unauthorized(""));
    }

    // ----------------------------Validating in database--------------------------------

    if (!validator.ValidateID(userInfo.email)) {
        return res.send(messages.not_found("User"));
    }

    next();
};

module.exports = authenticate;