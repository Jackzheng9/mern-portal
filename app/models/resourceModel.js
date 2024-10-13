import mongoose from "mongoose";

const LessonSchema = mongoose.Schema({
  url:{type:String},
  assetType:{type:String}
})


const ResourceSchema = mongoose.Schema({
  title:{
    type:String,
    // required:true
  },
  tag:{
    type:String,
  },
  month:{
    type:String,
  },
  image:{
    type:String,
  },
  description:{
    type:String,
  },
  shortDesc:{
    type:String,
  },

  lectures:[{ 
    title:{type:String},
    desc:{type:String},
    image:{type:String}, 
    files:[{type:LessonSchema, default:{}}]  
  }],

  status:{
    type:String,
    default : 'Published'
  },
  slug: { type: String, unique:true },


},{timestamps:true})


const Resource = mongoose.model("Resource", ResourceSchema);
export default Resource;