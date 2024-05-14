const mongoose = require("mongoose");
const { Schema } = mongoose;
const userModel = require("./userModel");

const postSchema = mongoose.Schema(
    {
        title: String,
        summary: String,
        content: String,
        cover: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: userModel,
        },
    },
    {
        timestamps: true,
    }
);
const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;
