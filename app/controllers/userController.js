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
  console.log("login data",email, password)



  try {
    const user = await User.findOne({email});
    if(user && await user.matchPassword(password)){
      generateToken(res, user._id)
      // res.status(200).json({user})
      res.status(200).json({
        ...user.toObject(), // Convert user to a plain object
        password: undefined // Exclude the password field
      })
      
      /*
      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        loggedIn:true,
        role:user.role,
        status:user.status,
        phone:user.phone,
        company:user.company,
        status:user.status,
        completedFiles:user.completedFiles,
        industry:user.industry,
        employee:user.employee,
        goal:user.goal,
        workflow:user.workflow,
        manualWorks:user.manualWorks,
        mainIssue:user.mainIssue,
        achieveArea:user.achieveArea,
        notification:user.notification,
        companyDetails:user.companyDetails,
        company:user.company,
        improveArea:user.improveArea,
        browserInfo:user.browserInfo,
        notiSettings:user.notiSettings,
        phone:user.phone,
        city:user.city,
        state:user.state,
        country:user.country,
        timezone:user.timezone,
        image:user.image,
      })

      */


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
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log('Error:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });
             
        





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
  const {industry,employee,goal,workflow,manualWorks,mainIssue,improveArea,achieveArea,password,notification, companyDetails,company,browserInfo, newPassword,notiSettings,phone, city,state,country, timezone,image, personalNotifications, userEvents} = req.body
  console.log("Body", req.body);
  console.log("personalNotifications", personalNotifications);
  
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
      user.phone = phone || user.phone ;
      user.city = city || user.city ;
      user.state = state || user.state ;
      user.country = country || user.country ;
      user.timezone = timezone || user.timezone ;
      user.image = image || user.image ;

      if(password){
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
          throw new Error("Old password is incorrect!");
        }
        user.password = newPassword;
      }

    
      user.company = company || user.company ;
      
      if(notification){
        const oldNotifications = user.notifications;

        const isIncluded = oldNotifications.some(noti => noti.notification.toString() === notification);
        //console.log(isIncluded);
        if(!isIncluded){
          user.notifications.push({
            notification: notification,
            readStatus: true,
            //receivedAt: new Date(),
          });
        }
        
      }      
      if(personalNotifications){
        console.log("Adding personal Notifications")
        const oldNotifications = user.personalNotifications;
        // user.personalNotifications = [ ...(oldNotifications || []), personalNotifications ];
        user.personalNotifications.push(personalNotifications);
      }    
      if(userEvents){
        const oldEvents = user.userEvents;
        user.userEvents = [...oldEvents, userEvents]
      }

      user.companyDetails = companyDetails || user.companyDetails;
      user.notiSettings = notiSettings || user.notiSettings;
      if(browserInfo){
        user.browserInfo = [browserInfo, user.browserInfo[0] ? user.browserInfo[0] : '' ];
      }
      
      const updatedUser = await user.save();
      res.status(200).json({
        user:updatedUser
      })


    }else{
      throw new Error("Something went wrong!")
    }
  } catch (error) {
    res.status(401).json({message:error.message})
  }
  
}

/*
const resetPassword = async (req,res) => {

  console.log("User Reset Password hitted!")
  const {user:jwtuser} = req
  //console.log("auth user", jwtuser)
  const {oldPass, newPass} = req.body
  // console.log("Company details data", companyDetails);

  
  try {
    const user = await User.findOne({email:jwtuser.email})
    if(user){
      if(user.status == 'pending'){
        throw new Error("Your account is not approved yet! Contact an Admin.")
      }

      
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
        notifications: updatedUser.notifications,
        companyDetails: updatedUser.companyDetails,
        browserInfo: updatedUser.browserInfo,
        success:true
      })
    }else{
      throw new Error("Something went wrong!")
    }
  } catch (error) {
    res.status(401).json({message:error.message})
  }
  
}
*/


const addFileToUser = async (req,res) => {
  console.log("Add Lecture hitted!")
  const {user:jwtuser} = req
  //console.log("auth user", jwtuser)
  const {file} = req.body
  // console.log("Requested File",File);
  
  try {
    const user = await User.findOne({email:jwtuser.email})
    if(user){
      if(user.status == 'pending'){
        throw new Error("Your account is not approved yet! Contact an Admin.")
      }
      user.completedFiles = [...user.completedFiles, file];

      //user.password = req.body.password;
      const updatedUser = await user.save();
  
      res.status(200).json({
        _id: updatedUser._id,
        completedFiles: updatedUser.completedFiles,        
      })
    }else{
      throw new Error("Something went wrong!")
    }
  } catch (error) {
    res.status(401).json({message:error.message})
  }
  
}


const removeFileFromUser = async (req,res) => {
  console.log("Remove file hitted!")
  const {user:jwtuser} = req
  //console.log("auth user", jwtuser)
  const {fileId} = req.body
  console.log("Remove File",fileId);
  
  try {
    const user = await User.findOne({email:jwtuser.email})
    if(user){
      if(user.status == 'pending'){
        throw new Error("Your account is not approved yet! Contact an Admin.")
      }
      const newFiles = [...user.completedFiles].filter(file => file.fileId !== fileId)
      console.log("Newfiles", newFiles)
      user.completedFiles = newFiles;
      //user.password = req.body.password;
      const updatedUser = await user.save();
  
      res.status(200).json({
        _id: updatedUser._id,
        completedFiles: updatedUser.completedFiles,        
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
      // console.log("Users", users)
      const allCount = await User.countDocuments({role:'user'})
      const allAccepted = await User.countDocuments({role:'user',status:"Accepted"})
      const allPending = await User.countDocuments({role:'user',status:"Pending"})
      // console.log("allCount",allCount, allAccepted, allPending)
      res.status(200).json({message:"Success!", users, total:allCount, accepted: allAccepted, pending: allPending})
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
const queryUserByEmail = async (req,res) => {
  const {user} = req
  console.log("get usr by email")
  try {
    
    const email = req.params.email;
    if(!email || email =='' ){
      throw new Error("User email not found!")
    }
    const user = await User.find({email})
    res.status(200).json({message:"Success!", user})
    
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

export {registerUser,userEditAdmin,userLogin, getAllUsers,getUserById, getUserByEmail, editUser, userSetPassword, addFileToUser, removeFileFromUser,queryUserByEmail}