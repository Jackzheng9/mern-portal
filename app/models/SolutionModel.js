import mongoose from "mongoose";

const SolutionSchema = mongoose.Schema({
  title:{
    type:String,
    // required:true
  },
  image:{
    type:String,
  },
  description:{
    type:String,
  },
  benefits:{
    type:Array,
    default : [] 
  },
  workflows:{
    type:Array,
    default : [] 
  },
  tools:{
    type:Array,
    default : [] 
  },
  features:{
    type:Array,
    default : [] 
  },
  category:{
    type:String,
    default : ''
  },
  status:{
    type:String,
    default : 'Published'
  },
  slug: { type: String, unique:true },


})


const Solution = mongoose.model("Solution", SolutionSchema);
export default Solution;