import DeepDive from "../models/deepDiveModel.js";
import { MongooseError } from "mongoose";




const getAll = async (req,res) => {
  const deepDives = await DeepDive.find().sort({ createdAt: -1 });
  res.status(200).json({message:"Get all deep Dive", deepdives:deepDives})
}

const createDeepDive = async (req,res) => {
  const { title, description, image,active,slug,link } = req.body;
 
  try {
    if(!title){
      throw new Error("Deep Dive title must not be empty!")
    }

    const newDeepDive = await DeepDive.create({ title, description, image,active,slug,link  });
    res.status(201).json({ message: "New Deep Dive created!", deepdive: newDeepDive });
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message, error:error });
    }
  }
}

const editDeepDive = async (req,res) => {
  const { title, description, image,active,slug } = req.body;
 
  try {
    if(!title){
      throw new Error("Deep Dive title must not be empty!")
    }

    const newDeepDive = await DeepDive.create({ title, description, image,active,slug  });
    res.status(201).json({ message: "New Deep Dive created!", deepdive: newDeepDive });
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message, error:error });
    }
  }

}


export {getAll, createDeepDive, editDeepDive}