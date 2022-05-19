const userData = require("../../../models/");

const validator = {
    CheckPassword(password) {
        if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
            return true;
        } else {
            return false;
        }
    },

    ValidateEmail(email) {
        // console.log(email);
        return Boolean(
            email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{3,}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/
            )
        );
    },

};

module.exports = { validator };