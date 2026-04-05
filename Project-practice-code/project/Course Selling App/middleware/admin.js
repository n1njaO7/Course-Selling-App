const jwt = require("jsonwebtoken");
const {ADMIN_JWT_SECRET} = require("../config");

function adminAuthMiddleware(req,res,next){

  const token = req.headers.token;

  const user = jwt.verify(token,ADMIN_JWT_SECRET);
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
    adminAuthMiddleware
};