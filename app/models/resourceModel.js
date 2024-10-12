import mongoose from "mongoose";

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
  lectures:{
    type:Array,
    default : [] 
  },
  status:{
    type:String,
    default : 'Published'
  },
  slug: { type: String, unique:true },


},{timestamps:true})


const Resource = mongoose.model("Resource", ResourceSchema);
export default Resource;