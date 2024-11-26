import Notification from "../models/notificationModel.js";
import { MongooseError } from "mongoose";

const getAll = async (req,res) => {
  const notifications = await Notification.find();
  res.status(200).json({message:"Get all notifications", notifications})
}

const createNotification = async (req,res) => {
  const { title, message, duration,type } = req.body;
 
  try {
    if(!title && !text){
      throw new Error("Notification title & text must not be empty!")
    }

    const newNotification = await Notification.create({ title, message, duration,type });
    res.status(201).json({ message: "New notification created!", notification: newNotification });
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message, error:error });
    }
  }

}


export {getAll,createNotification}