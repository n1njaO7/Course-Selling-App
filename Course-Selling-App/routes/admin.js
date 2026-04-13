const { Router } = require("express");
const adminRouter = Router();

adminRouter.post("/signup",(req,res)=>{
    res.json({
        message : "Admin signup Router"
    })
})

adminRouter.post("/signin",(req,res)=>{
    res.json({
        message : "Admin signin Router"
    })
})

adminRouter.post("/course",(req,res)=>{
    res.json({
        message : "Admin course Router post "
    })
})

adminRouter.put("/course",(req,res)=>{
    res.json({
        message : "Admin course Router put"
    })
})

adminRouter.get("/course/bulk",(req,res)=>{
    res.json({
        message : "Admin bulk course Router"
    })
})

module.exports={
    adminRouter : adminRouter
}