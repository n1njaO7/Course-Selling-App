const jwt = require("jsonwebtoken");
const {USER_JWT_SECRET} = require("../config");

function userAuthMiddleware(req,res,next){

  const token = req.headers.token;

  const user = jwt.verify(token,USER_JWT_SECRET);
  if(user){
    req.userId = user.userId;
    next();
  }
  else(
    res.json({
        message : "Wrong Credencials"
    })
  )

};

module.exports={
    userAuthMiddleware
};