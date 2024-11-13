import mongoose from "mongoose";

const deepDiveSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    slug: { type: String, unique:true },
    active: { type: Boolean },
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