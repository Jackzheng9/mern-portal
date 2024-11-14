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
  const { title, description, link, image, active,id } = req.body;
 
  try {
    const deepDive = await DeepDive.findById(id);

    deepDive.title = title || deepDive.title;
    deepDive.description = description || deepDive.description;
    deepDive.link = link || deepDive.link;
    deepDive.image = image || deepDive.image;
    deepDive.active = active || deepDive.active;

    const updatedDeepDive = await deepDive.save();
    res.status(201).json({ message: "Edit done!", deepdive: updatedDeepDive });
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message, error:error });
    }
  }

}

const deleteDeepDive = async (req, res) => {
  console.log("Deep dive delete route!")
  const { id } = req.body;
  console.log("Body", req.body)

  try {
    if (!id) {
      throw new Error("Deep Dive ID must not be empty!");
    }

    const deletedDeepDive = await DeepDive.findByIdAndDelete(id);
    if (!deletedDeepDive) {
      return res.status(404).json({ message: "Deep Dive not found!" });
    }

    res.status(200).json({ message: "Deep Dive deleted successfully!", deepdive: deletedDeepDive });
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message, error: error });
    }
  }
}


export {getAll, createDeepDive, editDeepDive, deleteDeepDive}