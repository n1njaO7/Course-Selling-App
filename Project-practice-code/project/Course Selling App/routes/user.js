const { Router } = require("express");
const userRouter = Router();
const {userModel,courseModel} = require("../db");
const jwt = require("jsonwebtoken");
const {USER_JWT_SECRET} = require("../config");
const {userAuthMiddleware} = require("./middleware/user");
const bcrypt = require("bcrypt");
const {z} = require("zod");


userRouter.post("/signup",async (req,res)=>{

    const requireBody = z.object({
        email : z.string().min(3).max(50).email(),
        firstName : z.string().min(3).max(50),
        lastName : z.string().min(3).max(50),
        password : z.string().min(3).max(50),
    });

    const parsedData = requireBody.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "incorrect format",
            error:   parsedData.error
        })
        return
    };
    
    try{
        const {email,firstName,lastName,password} = parsedData.data;
        const hasedpassword = await bcrypt.hash(password,10);
        
        await userModel.create({
            email,
            firstName,
            lastName,
            password:hasedpassword
        });
            
        res.json({
            message : "you are signed up"
        });
    }catch(e){
        res.json({
            message:"user already exists"
        })
    }
});

userRouter.post("/signin",async(req,res)=>{

    const requireBody = z.object({
        email : z.string ().min(3).max(50).email(),
        password : z.string ().min(3).max(50),
    });

    const parsedData = requireBody.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "incorrect format",
            error : parsedData.error
        })
        return
    };

    try{
        const {email,password} = parsedData.data;
        const user = await userModel.findOne({
            email
        });
        const passwordOrignal =await bcrypt.compare(password,user.password);
        if(user&&passwordOrignal){
            const token = jwt.sign({
                userId : user._id.toString()
            },USER_JWT_SECRET)
            res.json({
            token
            });

        }else{
            res.json({
                message:"Incorrect password or user"
            })
        }
        
    }catch(e){
        res.json({
            message:"user not found"
        })
    }
});

userRouter.use(userAuthMiddleware);

userRouter.get("/purchases",async(req,res)=>{
    const userId = req.userId;
    const purchases = await courseModel.find({
        userId
    });
    const purchasedCourseId = [];
    for(let i =0 ; i<purchases.length;i++){
        purchasedCourseId.push(purchases[i].courseId)
    };
    const courseData = await courseModel.findOne({
        _id : {$in : purchasedCourseId}
    })
    res.json({
        purchases,
        courseData
    })
});
module.exports={
    userRouter
}