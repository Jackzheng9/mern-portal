import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import Notification from "./notificationModel.js";

const userNotificationSchema = new mongoose.Schema({
  notification: { type: mongoose.Schema.Types.ObjectId, ref: 'Notification', required: true },
  readStatus: { type: Boolean, default: true },
  // receivedAt: { type: Date, default: Date.now },
});



const userSchema = mongoose.Schema({
  role:{
    type:String,
    default:"user",
    enum : ['user','admin','superAdmin']
  },
  status:{
    type:String,
    default:"Pending",
    enum : ['Pending','Accepted','Rejected']
  },
  firstName:{
    type:String,
  },
  lastName:{
    type:String,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String
  },
  phone:{
    type:String
  },
  company:{
    type:String,
  },
  industry:{
    type:String,
  },
  employee:{
    type:String,
  },
  goal:{
    type:String,
  },
  workflow:{
    type:String,
  },
  manualWorks:{
    type:String,
  },
  mainIssue:{
    type:String,
  },
  improveArea:{
    type:String,
  },
  achieveArea:{
    type:String,
  },
  completedFiles:{
    type:[{}],
  },
  companyDetails: {
    type: Object,
    default: {}
  },

  notifications: [userNotificationSchema],

},{timestamps: true})


userSchema.pre('save', async function(next){
  if( !this.isModified('password')){
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}


const User = mongoose.model('User', userSchema);
export default User