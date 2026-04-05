const {Router} = require("express");
const courseRouter = Router();
const {userAuthMiddleware} = require("./middleware/user");
const { purchaseModel, courseModel } = require("../db");

courseRouter.post("/purchase",userAuthMiddleware,async(req,res)=>{
    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    }) 

    res.json({
        message : "You have purchased"
    })
});

courseRouter.get("/preview",async(req,res)=>{
    const courses = await courseModel.find({});// it will give all the course
    res.json({
        courses
    })
});

module.exports={
    courseRouter
}