const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { PurchaseModel, CourseModel } = require("../src/db");

const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware, async function(req, res) {

    const userId = req.userId;
    const courseId = req.body.courseId;

    if (!courseId) {
        return res.status(400).json({
            message: "courseId is required"
        });
    }

    // Confirm the course exists before recording a purchase. Without this,
    // a user could "buy" any arbitrary / non-existent courseId.
    const course = await CourseModel.findById(courseId);
    if (!course) {
        return res.status(404).json({
            message: "Course not found"
        });
    }

    await PurchaseModel.create({
        userId,
        courseId
    });

    res.json({
        message: "You have successfully bought the course"
    });
});

courseRouter.get("/preview", async function(req, res) {

    const courses = await CourseModel.find({});

    res.json({
        courses
    });
});

module.exports = {
    courseRouter
};