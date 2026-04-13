const {Router} = require("express")
const userRouter = Router();

userRouter.post("/signin",(req,res)=>{
    res.json({
        message : "User signin Router"
    })
})

userRouter.post("/signup",(req,res)=>{
    res.json({
        message : "User signup Router"
    })
})

userRouter.get("/purchases",(req,res)=>{
    res.json({
        message : "User signin Router"
    })
})

module.exports = {
    userRouter
}