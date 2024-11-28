import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import Notification from "./notificationModel.js";

const userNotificationSchema = new mongoose.Schema({
  notifications: { type: mongoose.Schema.Types.ObjectId, ref: 'Notification', required: true },
  readStatus: { type: Boolean, default: true },
  // receivedAt: { type: Date, default: Date.now },
},{timestamps: true});

const personalNotificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  // date: { type: Date, default: Date.now },
  notificationType:{ type: String },
  resourceId : {type:String},
  read : {type:Boolean, default: false },
},{timestamps: true});

const userEventsSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventType: { type: String, },
  eventMessage: { type: String, },
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
  city:{
    type:String
  },
  state:{
    type:String
  },
  country:{
    type:String
  },
  timezone:{
    type:String
  },
  image:{
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
  browserInfo: [{
    type: Object,
  }],
  notiSettings :{
    type: Object,
    default: {}
  },
  websute :{
    type: String,
  },
  // notifications: [userNotificationSchema],
  notifications: [],
  personalNotifications:[personalNotificationSchema], 
  userEvents:[userEventsSchema],

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