import mongoose from "mongoose";

const deepDiveSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    slug: { type: String },
    active: { type: Boolean },
    type:{type: String},
    postType:{type: String},
    toolName:{type: String},
    bestFor:{type: String},
    pricing:{type: String},
    videoId:{type: String},
    link: {
        type: String, 
        validate: {
            validator: function(v) {
                const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
                return v == null || v.trim().length === 0 || urlRegex.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        },
        required: true
    },
},{timestamps:true});

const DeepDive = mongoose.model('DeepDive', deepDiveSchema);

export default DeepDive