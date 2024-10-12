import Resource from "../models/resourceModel.js";
import { MongooseError } from "mongoose";



const getAdminAllResources = async (req,res) => {
  const allResources = await Resource.find();
  res.status(201).json({message:"Success", resources:allResources})
}


const createResource = async (req, res) => {
  const { title, description, shortDesc, image, benefits, workflows,tools,features,category,status, slug } = req.body;
  // console.log("Body Data", title, description, image, benefits, workflows, tools, features, category,status, slug);
 
  try {
    if(!title){
      throw new Error("Resource title must not be empty!")
    }

    const newMonthly = await MonthlyContent.create({ title, description,shortDesc, image, benefits, workflows, tools, features,category,status, slug });
    res.status(201).json({ message: "New solution created!", monthly: newMonthly });
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message, error:error });
    }
  } 



}


/*


const createSolution = async (req, res) => {
  const { title, description, shortDesc, image, benefits, workflows,tools,features,category,status, slug } = req.body;
  // console.log("Body Data", title, description, image, benefits, workflows, tools, features, category,status, slug);
 
  try {
    if(!title){
      throw new Error("Sollution title must not be empty!")
    }

    const newSolution = await Solution.create({ title, description,shortDesc, image, benefits, workflows, tools, features,category,status, slug });
    res.status(201).json({ message: "New solution created!", solution: newSolution });
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message, error:error });
    }
  } 



}

const getSolutionBySlug = async (req,res) => {
  // console.log("solution by slug hit!")
  const slug = req.params.slug;
  const solution = await Solution.find({slug})
  // console.log("solution", solution)
  res.status(200).json({solution:solution[0]})
}

const editSolution = async (req,res) => {
  const {id, title, description,shortDesc, image, benefits, workflows,tools,features,category,status} = req.body;
  try {
    const solution = await Solution.findById(id);
    
    solution.title = title || solution.title
    solution.status = status || solution.status
    solution.description = description || solution.description
    solution.shortDesc = shortDesc || solution.shortDesc
    solution.image = image || solution.image
    solution.benefits = benefits || solution.benefits
    solution.workflows = workflows || solution.workflows
    solution.tools = tools || solution.tools
    solution.features = features || solution.features
    solution.category = category || solution.category


    const updatedSolution = await solution.save();
    res.status(200).json({solution:updatedSolution})
    
  } catch (error) {
    res.status(500).json({error})
  }

  
}
*/
export { getAdminAllResources, createResource };