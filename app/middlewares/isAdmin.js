import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const isAdmin = asyncHandler( async (req,res,next) => {
  let token;
  token = req?.cookies?.jwt;
  if(token){
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      let userExists = await User.findById(decoded.userId).select('-password');
      req.user = userExists;
      
      if(userExists.role == 'superAdmin' || userExists.role == 'admin'){
        next();
      }else{
        throw new Error("Not authorized")
      }
      

    }catch(err){
      res.status(401)
      throw new Error(err.message)
    }
  }else{
    res.status(401)
    throw new Error("No Token, User not authorized to see this resource!")
    
  }
})

export default isAdmin;