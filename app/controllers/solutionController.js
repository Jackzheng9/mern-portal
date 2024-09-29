import Solution from "../models/SolutionModel.js";
import User from "../models/userModel.js";
import { MongooseError } from "mongoose"; // Ensure you import MongooseError if needed

const createSolution = async (req, res) => {
  const { title, description, image, benefits, workflows,tools,features,category,status, slug } = req.body;
  console.log("Body Data", title, description, image, benefits, workflows, tools, features, category,status, slug);
 
  try {

    const newSolution = await Solution.create({ title, description, image, benefits, workflows, tools, features,category,status, slug });
    res.status(201).json({ message: "New solution created!", solution: newSolution });
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An error occurred - ", error:error });
    }
  } 



}

export { createSolution };