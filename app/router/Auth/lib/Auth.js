const Authenticate = {};
require("dotenv").config();
const userData = require("../../../models/");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validator } = require("./Validators");
// -----------------------------[REGISTER]-----------------------------------------

Authenticate.Register = async(req, res) => {
    //---------------Email-password Validate---------------------
    console.log(req.body);
    if (req.body.email == undefined || req.body.password == undefined) {
        return res
            .status(400)
            .send(messages.required_field("Please Fill All Fields"));
    }
    var exist = await AuthenicateEmail(req.body.email);
    if (!exist ||
        !validator.ValidateEmail(req.body.email) ||
        !validator.CheckPassword(req.body.password)
    ) {
        // console.log("in", !exist);
        return res.json({
            Error: messages.wrong_credentials("invalid id or password"),
            Data: `Possible Reasons : <1> Email Already Exist,
                                       <2>Validation Error`,
        });
    }
    // console.log("Out", !validator.AuthenicateEmail(req.body.email));

    let hash = await bcrypt.hash(req.body.password, 10);
    console.log(req.body);
    hash = String(hash);

    const user = new userData({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        uType: "user",
    });
    try {
        const result = await user.save();
        res.send(messages.successfully("Registerd"));
    } catch (e) {
        console.log(e);
    }
};

// ----------------------------------------------------[Signin]--------------------------------------

Authenticate.signIn = async(req, res) => {
    if (req.body.email == undefined || req.body.password == undefined) {
        return res.send(messages.required_field("Email-Password"));
    }

    // if (!validator.CheckPassword(req.body.password) ||
    //     !validator.ValidateEmail(req.body.email)
    // ) {
    //     return res.send(messages.wrong_credentials("invalid id or password"));
    // }

    // console.log(req.body);
    // console.log(req.body.password);
    var userInfo = await userData.findOne({ email: req.body.email });
    // console.log(userInfo);
    if (userInfo == {} || !userInfo) {
        return res.send(
            messages.not_found("[User Not Exist Please Register]: User")
        );
    }

    const test = await bcrypt.compare(req.body.password, userInfo.password);
    // console.log(test);
    if (!test) {
        return res.json(messages.wrong_credentials("[Password]"));
    } else {
        const token = await jwt.sign({
                email: userInfo.email,
                uType: userInfo.uType,
            },
            process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" }
        );

        req.session["token"] = token;
        req.session["email"] = userInfo.email;
        req.session["uType"] = userInfo.uType;
        // console.log(req.session);
        res.json({ Status: messages.successfully("Signed-In"), token: token });
    }
};

Authenticate.signOut = (req, res) => {
    // console.log("Before::", req.session);
    req.session.destroy();
    // console.log("After::", req.session);
    res.send(messages.successfully("Loged-Out"));
};

AuthenicateEmail = async(email) => {
    let match = await userData.find({ email: email });
    console.log(match);
    console.log(match.length);
    if (!match || match.length == 0) {
        console.log("true");
        return true;
    } else {
        console.log("False");
        return false;
    }
};

module.exports = { Authenticate };