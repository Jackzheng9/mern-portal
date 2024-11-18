import Support from "../models/supportModel.js";
import { MongooseError } from "mongoose";




const getAll = async (req,res) => {
  const supports = await Support.find();
  res.status(200).json({message:"Supports found", supports})
}

const createSupport = async (req,res) => {
  const { question,answer,active } = req.body;
 
  try {
    const support = await Support.create({ question,answer,active  });
    res.status(201).json({ message: "New Support item created!", support });
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message, error:error });
    }
  }
}

const editSupport = async (req,res) => {
  const { question,answer,id,active  } = req.body;
  console.log("req body", req.body)
 
  try {
    const support = await Support.findById(id);
    support.question = question;
    support.answer = answer;
    support.active = active;


    const updatedSupport = await support.save();
    res.status(201).json({ message: "Edit done successfully!", support : updatedSupport });
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message, error:error });
    }
  }

}

const deleteSupport = async (req,res) => {
  const { id  } = req.body;
 
  try {
    const deletedSupport = await Support.findByIdAndDelete(id); 
    if (!deletedSupport) {
      return res.status(404).json({ message: "Support item not found" });
    }
    res.status(200).json({ message: "Support item deleted successfully!", support: deletedSupport });
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message, error: error });
    }
  }

}




export {getAll, createSupport, editSupport,deleteSupport}