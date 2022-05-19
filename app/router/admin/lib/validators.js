let validator = {};
const userData = require("../../../models/");

const admin = {
    id: "myAdmin",
    password: "SecuredPassword",
};

validator.ValidateID = async(email) => {
    var userInfo = await userData.find({ email: email });

    // -------------------------Verifying in Database---------------
    if (userInfo.length < 1) {
        return false;
    } else {
        return true;
    }
};

module.exports = { validator };