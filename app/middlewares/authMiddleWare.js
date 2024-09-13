import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler( async (req,res,next) => {
  let token;
  token = req?.cookies?.jwt;
  if(token){
    try{
      console.log("Token found")
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.userId).select('-password');
      next();

    }catch(err){
      res.status(401)
      throw new Error("Invalid Token!")
    }
  }else{
    res.status(401)
    throw new Error("No Token, User not authorized to see this resource!")
    
  }
})

export default protect;