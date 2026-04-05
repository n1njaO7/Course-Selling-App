const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

mongoose.connect("mongodb+srv://n1nja:n1njaQwertyuiop7@cluster0.wez9r.mongodb.net/course-selling-app");

const userSchema = new Schema({
    email : {type : String , unique : true},
    password : String,
    firstName : String , 
    lastName : String
}); 

const adminSchema = new Schema({
    email : {type : String , unique : true},
    password : String,
    firstName : String , 
    lastName : String
});

const courseSchema = new Schema({
    title : String,
    description : String,
    price : Number , 
    imageUrl : String,
    creatorId : ObjectId
});

const purchaseSchema = new Schema({
   userId : ObjectId,
   courseId : ObjectId
});

const userModel = mongoose.model("users",userSchema);
const adminModel = mongoose.model("admins",adminSchema);
const courseModel = mongoose.model("courses",courseSchema);
const purchaseModel = mongoose.model("purchases",purchaseSchema);

module.exports={
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}