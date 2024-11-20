import express from 'express'
import nodemailer from 'nodemailer';
import { registerUser,userEditAdmin,userLogin,getAllUsers,getUserById,getUserByEmail,editUser,userSetPassword, addFileToUser,removeFileFromUser,queryUserByEmail } from '../controllers/userController.js';
import protect from '../middlewares/authMiddleWare.js';

const userRouter = express.Router()

userRouter.get('/',(req,res) => {
  res.status(200).json({msg:"user routes"})
})
userRouter.post('/register', registerUser)
userRouter.post('/login', userLogin)
userRouter.post('/setpassword', userSetPassword)
// userRouter.post('/resetpassword', resetPassword)
userRouter.post('/edituser',protect, editUser)
userRouter.post('/admin/useredit',protect,userEditAdmin)
userRouter.get('/admin/users',protect,getAllUsers)
userRouter.get('/admin/users/:id',protect,getUserById)
userRouter.post('/getUser', getUserByEmail)
userRouter.get('/getuser/:email', queryUserByEmail)
userRouter.post('/addfile',protect, addFileToUser)
userRouter.post('/removefile',protect, removeFileFromUser)

userRouter.get('/email',(req,res) => {

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
    to: 'mahmud.online11@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  // Send the email
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
  res.status(200).json({msg:"Email sent"})
})


export default userRouter;