const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { AdminModel, CourseModel } = require("../src/db");
const { adminMiddleware } = require("../middleware/admin");

const adminRouter = Router();

// Admin Signup
adminRouter.post("/signup", async (req, res) => {

    const { firstName, lastName, email, password } = req.body;

    try {

        const existingAdmin = await AdminModel.findOne({
            email
        });

        if (existingAdmin) {
            return res.status(400).json({
                message: "Admin already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await AdminModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        return res.json({
            message: "Admin created successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Something went wrong"
        });

    }
});

// Admin Signin
adminRouter.post("/signin", async (req, res) => {

    const { email, password } = req.body;

    try {

        const admin = await AdminModel.findOne({
            email
        });

        if (!admin) {
            return res.status(403).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isMatch) {
            return res.status(403).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: admin._id
            },
            process.env.JWT_ADMIN_PASSWORD
        );

        res.cookie("adminToken", token);

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

// Create Course
adminRouter.post("/course", adminMiddleware, async (req, res) => {

    const { title, description, price, imgUrl } = req.body;

    try {

        const course = await CourseModel.create({
            title,
            description,
            price,
            imgUrl,
            creatorId: req.adminId
        });

        return res.json({
            message: "Course created successfully",
            courseId: course._id
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Something went wrong"
        });

    }
});

// Update Course
adminRouter.put("/course", adminMiddleware, async (req, res) => {

    const { courseId, title, description, price, imgUrl } = req.body;

    try {

        const result = await CourseModel.updateOne(
            {
                _id: courseId,
                creatorId: req.adminId   // scope to this admin's own courses
            },
            {
                title,
                description,
                price,
                imgUrl
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Course not found or you do not have permission to update it"
            });
        }

        return res.json({
            message: "Course updated successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Something went wrong"
        });

    }
});

// Get All Courses Created By Admin
adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {

    try {

        const courses = await CourseModel.find({
            creatorId: req.adminId
        });

        return res.json({
            courses
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Something went wrong"
        });

    }
});

module.exports = {
    adminRouter
};