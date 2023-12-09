import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'name is required'], 
        trim: true
    },
    breed: {
        type: String, 
        required: [true, 'breed is required'], 
        trim: true
    },
    price: {
        type: Number, 
        required: [true, 'price is required'], 
    },
    description:{
        type: String,
    }, 
    image:{
        type: String,
        required: [true, 'image is required']
    },
    ownerId:{
        type: mongoose.Types.ObjectId,
        ref: 'seller'
    }
})


const pet = mongoose.model('Pet', schema)
export default pet;