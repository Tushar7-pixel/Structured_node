const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    uType: {
        type: String,
        enum: ["user", "admnin"],
        default: "user",
        require: true,
    },
});
module.exports = mongoose.model("userData", userSchema);