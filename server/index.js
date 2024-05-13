const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();

const mongoose = require("mongoose");
const userModel = require("./models/userModel");
const postModel = require("./models/postModel");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");

//fileMiddleware dest file name
const uploadMiddleware = multer({ dest: "uploads/" });

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("connected"))
    .catch((e) => console.log(e.message, "not connected"));

app.post("/register", async (req, res) => {
    const { userName, password } = req.body;
    try {
        if (!password) {
            return res
                .status(400)
                .json({ error: true, message: "Fill * required" });
        }

        const genSalt = await bcryptjs.genSalt(8);
        const passwordHashed = await bcryptjs.hash(password, genSalt);

        const user = await userModel.create({
            userName,
            password: passwordHashed,
        });

        res.json({ error: false, user, message: "Register completed !" });
    } catch (error) {
        if (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }
});

app.post("/login", async (req, res) => {
    const { userName, password } = req.body;
    try {
        if (!userName || !password) {
            return res
                .status(400)
                .json({ error: true, message: "Fill * required" });
        }

        const user = await userModel.findOne({ userName: userName });
        if (!user) {
            return res.status(403).json({ error: true, message: "Not user" });
        }

        const passwordCheck = await bcryptjs.compare(password, user.password);
        if (!passwordCheck) {
            return res
                .status(403)
                .json({ error: true, message: "Wrong password" });
        }

        const token = jwt.sign({ user }, process.env.SECRET_KEY);

        res.cookie("token", token).json({
            error: false,
            user,
            token,
            message: "Login successfully!",
        });
    } catch (error) {
        if (error) {
            res.status(500).json({ error: true, message: "Server error" });
        }
    }
});

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    const user = jwt.verify(token, process.env.SECRET_KEY);
    if (!user) {
        res.json({ error: true, message: "Token not valid" });
    }
    console.log(user.user.userName);
    res.json(user);
});

app.post("/logout", (req, res) => {
    res.cookie("token", "").json({ error: false, message: "User logout" });
});

//using custom middleware for file req single(name in data)
app.post("/post", uploadMiddleware.single("files"), async (req, res) => {
    //original name for ext path for name
    const { originalname, path } = req.file;

    //get ext from original name
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];

    //set new name for file
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { title, content, summary } = req.body;

    const postDoc = await postModel.create({
        title,
        content,
        summary,
        cover: newPath,
    });
 
    res.json(postDoc);
});

app.listen(8000, () => {
    console.log("running");
});
