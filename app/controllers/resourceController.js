import Resource from "../models/resourceModel.js";
import { MongooseError } from "mongoose";



const getAdminAllResources = async (req,res) => {
  const allResources = await Resource.find();
  res.status(201).json({message:"Success", resources:allResources})
}


const createResource = async (req, res) => {
  const { title, description, shortDesc, image, imgName, lectures,status, slug,tag, month, year } = req.body;
  // console.log("Body Data", title, description, image, benefits, workflows, tools, features, category,status, slug);
 
  try {
    if(!title){
      throw new Error("Resource title must not be empty!")
    }

    const newResource = await Resource.create({ title, description, shortDesc, image, imgName, lectures,status, slug,tag, month, year });
    res.status(201).json({ message: "New solution created!", resource: newResource });
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message, error:error });
    }
  } 



}


const editResource = async (req, res) => {
  const { id, title, description, shortDesc, image,imgName, lectures,status, slug,tag, month, year } = req.body;
  // console.log("Body Data", id, title, description, shortDesc, image,imgName, lectures,status, slug,tag, month, year);

  // console.log("year", year)
  // console.log("Lecture files", lectures.files)
  lectures.forEach(lecture => console.log("files", lecture.files))
 
  try {

    if(!id){
      throw new Error("Post ID is a must!")
    }
    const resource = await Resource.findById(id)
    
    // console.log("Resoruce found!", resource)

    resource.title = title || resource.title;
    resource.description = description|| resource.description;
    resource.shortDesc = shortDesc|| resource.shortDesc;
    resource.image = image|| resource.image;
    resource.imgName = imgName|| resource.imgName;
    resource.lectures = lectures|| resource.lectures;
    resource.status = status|| resource.status;
    resource.slug = slug|| resource.slug;
    resource.tag = tag || resource.tag;
    resource.month = month || resource.month;
    resource.year = year || resource.year;

    const updatedResource = await resource.save();
    res.status(201).json({ message: "Successfully updated!", resource: updatedResource });


  } catch (error) {

    if (error instanceof MongooseError) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message, error });
    }

  } 



}


const getResourceBySlug = async (req,res) => {
  // console.log("resource by slug hit!")
  const slug = req.params.slug;
  const resource = await Resource.find({slug})
  // console.log("solution", solution)
  res.status(200).json({resource:resource[0]})
}

const deleteResource = async (req,res) => {
  const {id} = req.body;
  // console.log("Delete item with - ", id)
  try {
    if (!id) {
      throw new Error("Resource ID is required!");
    }

    const deletedResource = await Resource.findByIdAndDelete(id);

    if (!deletedResource) {
      return res.status(404).json({ message: "Resource not found!" });
    }

    res.status(200).json({ message: "Resource deleted successfully!", resource: deletedResource });
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message, error });
    }
  }  
}



export { getAdminAllResources, createResource, getResourceBySlug, editResource, deleteResource };