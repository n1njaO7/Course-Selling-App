const express = require("express");
const { userRouter } = require("../routes/user");
const { adminRouter } = require("../routes/admin");
const { courseRouter } = require("../routes/course");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Course Selling App Backend is running 🚀");
});

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);

module.exports = app;
