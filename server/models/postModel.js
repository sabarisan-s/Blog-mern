const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
    {
        title: String,
        summary: String,
        content: String,
        cover: String,
        userId: String,
    },
    {
        timestamps: true,
    }
);
const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;
