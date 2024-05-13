const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        userName: { type: String, required: true, min: 4, unique: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
