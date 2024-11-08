import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    duration: { type: String },
    type: { 
      type: String,
      // enum: ['info', 'warning', 'error']
    },
},{timestamps:true});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification