require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
    userId : ObjectId,
    firstName  : String,
    lastName  : String,
    email : {type:String, unique : true},
    password : String,
})

const AdminSchema = new Schema({
    adminId : ObjectId,
    firstName  : String,
    lastName  : String,
    email : {type:String, unique : true},
    password : String,
})

const CourseSchema = new Schema({
    courseId : ObjectId,
    title : String,
    discription : String,
    price : Number,
    imgUrl : String,
    creatorUrl : ObjectId
})

const PurchaseSchema = new Schema({
    purchaseId : ObjectId,
    userId : ObjectId,
    courseId : ObjectId,
})

const UserModel = mongoose.model("user",UserSchema);
const AdminModel = mongoose.model("admin",AdminSchema);
const CourseModel = mongoose.model("course",CourseSchema);
const PurchaseModel = mongoose.model("purchase",PurchaseSchema);

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel,
    connectDB
}



