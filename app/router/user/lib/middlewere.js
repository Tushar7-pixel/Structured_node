const userData = require("../../../models/index");

// ----------------------------------------------------------------Authenticate-----------------------------------------------

const authenticate = async(req, res, next) => {
    let token = req.headers.token;

    // -----------------------Checking Session-------------------------------
    if (token == undefined) {
        return res.send(messages.expired("[Please Log-in First],Session is"));
    }
    // console.log("Session 1", req.session);
    // console.log("Session 1", req.session.email);

    // -------------------------------Decoding Token---------------------
    let base64Url = token.split(".")[1];
    let base64 = JSON.parse(atob(base64Url));
    // console.log(base64);
    // -----------------------------Finding in Database-----------
    var userInfo = await userData.findOne({ email: base64.email });
    if (userInfo.length < 1) {
        return res.send(messages.not_found("User"));
    }
    // console.log("Database ::", userInfo);

    // ------------------------------------Comparing Data in Session----------------

    // console.log(`--------------------
    //             ${userInfo.email} == ${req.session.email}
    //             ${userInfo.uType} == ${req.session.uType}
    //             -------------------- `);

    if (
        userInfo.email != req.session.email ||
        userInfo.uType != req.session.uType ||
        base64.uType == "admin" ||
        base64.uType != "user"
    ) {
        return res.send(messages.unauthorized(""));
    }

    next();
};

module.exports = authenticate;