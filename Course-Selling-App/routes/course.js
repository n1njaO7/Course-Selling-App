const {Router} = require("express");
const courseRouter = Router();

courseRouter.post("/purchase",(req,res)=>{
    res.json({
        message : "couse Purchase router"
    })
})

courseRouter.get("/preview",(req,res)=>{
    res.json({
        message : "couse preview router"
    })
})

module.exports={
    courseRouter : courseRouter
}