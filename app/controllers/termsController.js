import Terms from "../models/termsModel.js";
import { MongooseError } from "mongoose";




const getAll = async (req,res) => {
  const terms = await Terms.find();
  res.status(200).json({message:"Terms found", terms})
}

const createTerms = async (req,res) => {
  const { content } = req.body;
 
  try {
    const terms = await Terms.create({ content  });
    res.status(201).json({ message: "New Terms created!", terms });
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message, error:error });
    }
  }
}

const editTerms = async (req,res) => {
  const { content } = req.body;
  console.log("body", req.body)
 
  try {
    const terms = await Terms.find();
    const curTerms = terms[0]
    console.log("Terms", terms)

    curTerms.content = content;

    const updatedTerms = await curTerms.save();
    res.status(201).json({ message: "Edit done successfully!", terms : updatedTerms });
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message, error:error });
    }
  }

}


export {getAll, createTerms, editTerms}