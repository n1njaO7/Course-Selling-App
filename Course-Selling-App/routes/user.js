const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { UserModel, PurchaseModel, CourseModel } = require("../src/db");
const { userMiddleware } = require("../middleware/user");

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {

    const { firstName, lastName, email, password } = req.body;

    try {

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        await UserModel.create({
            firstName,
            lastName,
            email,
            password
        });

        return res.json({
            message: "User created successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Error creating user"
        });

    }
});

userRouter.post("/signin", async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await UserModel.findOne({
            email,
            password
        });

        if (!user) {
            return res.status(403).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_USER_PASSWORD
        );

        return res.json({
            message: "Signin successful",
            token
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Something went wrong"
        });

    }
});

userRouter.get("/purchases", userMiddleware, async (req, res) => {

    try {

        const purchases = await PurchaseModel.find({
            userId: req.userId
        });

        const courseIds = purchases.map(x => x.courseId);

        const coursesData = await CourseModel.find({
            _id: {
                $in: courseIds
            }
        });

        return res.json({
            purchases,
            coursesData
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Something went wrong"
        });

    }
});

module.exports = {
    userRouter
};