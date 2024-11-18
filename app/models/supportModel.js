import mongoose from "mongoose";

const supportSchema = new mongoose.Schema({
    question: { type: String, required:true },
    answer: { type: String,required:true },
    active:{type:Boolean}
},{timestamps:true});

const Support = mongoose.model('Support', supportSchema);

export default Support