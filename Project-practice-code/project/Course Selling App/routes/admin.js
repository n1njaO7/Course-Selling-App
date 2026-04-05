const {Router} = require("express");
const adminRouter = Router();
const {adminModel, courseModel} = require ("../db")
const {adminAuthMiddleware} = require("./middleware/admin");
const {ADMIN_JWT_SECRET} = require("../config");
const bcrypt = require("bcrypt");
const {z} = require("zod");
const jwt = require("jsonwebtoken");

adminRouter.post("/signup",async (req,res)=>{
    
    const requireBody = z.object({
        email : z.string().min(3).max(50).email(),
        firstName : z.string().min(3).max(50),
        lastName : z.string().min(3).max(50),
        password : z.string().min(3).max(50),

    })
    const parsedData = requireBody.safeParse(req.body);
    if (!parsedData.success){
        res.json({
            message:"Incorrect Format",
            error : parsedData.error.errors
        });
        return
    } 

    try{
        const {email,firstName,lastName,password} = parsedData.data;
        const hashedpassword = await bcrypt.hash(password,10);

        await adminModel.create({
            email,
            firstName,
            lastName,
            password:hashedpassword
        });
        res.json({
            message : "you are signed up"
        });

    }catch(e){
        res.json({
            message : "alraedy exists"
        })
    }

    
});

adminRouter.post("/signin",async(req,res)=>{

    const requireBody = z.object({
        email : z.string().min(3).max(50).email(),
        password : z.string().min(3).max(50),
    });

    const parsedData = requireBody.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "incorrect format",
            error : parsedData.error.errors
        })
    };

    try{
        const {email,password} = parsedData.data;
        const admin = await adminModel.findOne({
            email
        });
        const passwordOrignal =await bcrypt.compare(password,admin.password);
        if(admin&&passwordOrignal){
            const token = jwt.sign({
                userId : admin._id.toString()
            },ADMIN_JWT_SECRET)
            res.json({
            token
            });

        }else{
            res.json({
                message:"Incorrect password or admin"
            })
        }
        
    }catch(e){
        res.json({
            message:"admin not found"
        })
    }
    
});


adminRouter.use(adminAuthMiddleware);


adminRouter.post("/course",async(req,res)=>{
    const adminId = req.userId;
    const {title,description,price , imageUrl} = req.body;
    const course = await courseModel.create({
        title,
        description,
        price ,
        imageUrl ,
        creatorId : adminId
    })
    res.json({
        message : "courses created",
        courseId : course._id
    });
});

adminRouter.put("/course",async(req,res)=>{
    const adminId = req.userId;
    const {title,description,price,imageUrl,courseId}= req.body;
    const course = await courseModel.updateOne({
        _id : courseId,
        creatorId : adminId
    },{
        title,
        description,
        price,
        imageUrl
    });
    res.json({
        message : "updated courses",
        courseId:course._id
    });
});

adminRouter.get("/course/bulk",(req,res)=>{
    const adminId = req.userId;
    const courses = courseModel.findOne({
        creatorId:adminId
    });

    res.json({
        message : "All courses",
        courses
    });
});

module.exports={
    adminRouter
}; 