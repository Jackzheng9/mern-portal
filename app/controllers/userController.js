import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js";
import nodemailer from 'nodemailer';

const registerUser = async (req,res) => {
  const {firstName,lastName,email,phone,company,password} = req.body
  try {
    const userExist = await User.findOne({email});
    if(userExist){
      res.status(400)
      throw new Error("User already exists!")
    }
    
    let newUser;
    if(password){
      newUser = await User.create({firstName,lastName,email,phone,company,password})
    }else{
      newUser = await User.create({firstName,lastName,email,phone,company})
    }
    
    if(newUser){
      res.status(201).json({
        msg:"User created!",
        userInfo:{
          _id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phone: newUser.phone,
          company: newUser.company,
        }
      })
    }else{
      res.status(400)
      throw new Error("Invalid user data!")
    }
  } catch (error) {
    console.log(error.message)
    res.status(401).json({msg:error.message})
  }

  
}

const userLogin = async (req,res) => {
  const {email, password} = req.body
  try {
    const user = await User.findOne({email});
    if(user && await user.matchPassword(password)){
      generateToken(res, user._id)
      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        loggedIn:true,
        role:user.role,
        status:user.status,
        phone:user.phone,
        company:user.company

      })
    }else{
      throw new Error('Invalid email or password')
    }
  } catch (error) {
    res.status(401).json({"message":error.message})
  }
  
}

const userEditAdmin = async (req,res) => {
  const {user} = req
  try {
    if(user.role === 'admin' || user.role === 'superAdmin'){
      const {email, status, role} = req.body
      // console.log(email, status)
      const targetUser = await User.findOne({email});
      // console.log(targetUser)
      if(targetUser){
        targetUser.role = req.body.role || targetUser.role;
        targetUser.status = req.body.status || targetUser.status;
        const updatedUser = await targetUser.save();
    
        res.status(200).json({
          _id: updatedUser._id,
          firstName: updatedUser.fistName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          status: updatedUser.status,
          role: updatedUser.role,
          success:true,
        })

        // Create a transporter object
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // use SSL
          auth: {
            user: 'mahmud.linked@gmail.com',
            pass: 'riooftuzfknpqlyc',
          }
        });

        // Configure the mailoptions object
        const mailOptions = {
          from: 'mahmud.linked@gmail.com',
          to: email,
          subject: 'User Profile Updated',
          html: '<p>An admin has approved/updated your profile. Please set password and login <a href="https://datu.mahmud1.xyz?setpass=1">here</a></p>'
        };

        // Send the email
        
        // transporter.sendMail(mailOptions, function(error, info){
        //   if (error) {
        //     console.log('Error:', error);
        //   } else {
        //     console.log('Email sent:', info.response);
        //   }
        // });
             
        





      }else{
        res.status(404)
        throw new Error('User not found!')        
      }
    }else{
      throw new Error('not authorized!')
    }
  } catch (error) {
    res.status(401).json({"message":error.message})
  }
  
}


const editUser = async (req,res) => {
  console.log("Edit user hitted!")
  const {user:jwtuser} = req
  //console.log("auth user", jwtuser)
  const {industry,employee,goal,workflow,manualWorks,mainIssue,improveArea,achieveArea} = req.body
  console.log("req data",industry,employee,goal,workflow,manualWorks,mainIssue,improveArea,achieveArea);
  
  try {
    const user = await User.findOne({email:jwtuser.email})
    if(user){
      if(user.status == 'pending'){
        throw new Error("Your account is not approved yet! Contact an Admin.")
      }

      //console.log("User",user)

      user.industry = industry || user.industry ;
      user.employee = employee || user.employee ;
      user.goal = goal || user.goal ;
      user.workflow = workflow || user.workflow ;
      user.manualWorks = manualWorks || user.manualWorks ;
      user.mainIssue = mainIssue || user.mainIssue ;
      user.improveArea = improveArea || user.improveArea ;
      user.achieveArea = achieveArea || user.achieveArea ;
      


      //user.password = req.body.password;
      const updatedUser = await user.save();
  
      res.status(200).json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        status: updatedUser.status,
        role: updatedUser.role,
        industry: updatedUser.industry,
        employee: updatedUser.employee,
        goal: updatedUser.goal,
        workflow: updatedUser.workflow,
        manualWorks: updatedUser.manualWorks,
        mainIssue: updatedUser.mainIssue,
        improveArea: updatedUser.improveArea,
        achieveArea: updatedUser.achieveArea,
        success:true
      })
    }else{
      throw new Error("Something went wrong!")
    }
  } catch (error) {
    res.status(401).json({message:error.message})
  }
  
}

const getAllUsers = async (req,res) => {
  const {user} = req
  try {
    if(user.role === 'admin' || user.role === 'superAdmin'){
      // const users = await User.find({role:'user'})
      const users = await User.find({ role:'user'})
      console.log("Users", users)
      console.log("Get all users hit!")
      res.status(200).json({message:"Success!", users})
    }else{
      throw new Error('User is not authenticated to perform this action!')
    }
  } catch (error) {
    res.status(401).json({success:false, message:error.message})
  }
}

const getUserById = async (req,res) => {
  const {user} = req
  console.log("get usr by Id")
  try {
    if(user.role === 'admin' || user.role === 'superAdmin'){
     
      const id = req.params.id;
      //console.log("params Id", id)
      const user = await User.findById(id)
      res.status(200).json({message:"Success!", user})
    }else{
      throw new Error('User is not authenticated to perform this action!')
    }
  } catch (error) {
    res.status(401).json({success:false, message:error.message})
  }
}
const getUserByEmail = async (req,res) => {
  const {email} = req.body
  console.log(email)
  console.log("get usr by email")
  try {
    const user = await User.findOne({email})
    if(user){
      res.status(200).json({message:"Success!", user})
    }else{
      throw new Error('No user found with this email!')
    }
    
  } catch (error) {
    res.status(401).json({success:false, message:error.message})
  }
}

const userSetPassword = async (req, res) => {
  const {email,password, company} = req.body
  console.log(email, password, company);
  console.log("set pass hitted!");
  
  try {
    const user = await User.findOne({email})
    if(user){
      if(user.status == 'pending'){
        throw new Error("Your account is not approved yet! Contact an Admin.")
      }
      
      user.role = req.body.role || user.role;
      user.status = req.body.status || user.status;
      user.password = req.body.password;
      const updatedUser = await user.save();
      generateToken(res, updatedUser._id);
      res.status(200).json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        status: updatedUser.status,
        role: updatedUser.role,
        success:true
      })
    }else{
      throw new Error("Something went wrong!")
    }
  } catch (error) {
    res.status(401).json({message:error.message})
  
  }
  

}

export {registerUser,userEditAdmin,userLogin, getAllUsers,getUserById, getUserByEmail, editUser, userSetPassword}