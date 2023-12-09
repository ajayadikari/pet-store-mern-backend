import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'name is required'], 
        trim: true
    },
    address: {
        type: String, 
        required: [true, 'address is required'], 
        trim: true
    },
    password:{
        type: String, 
        required: [true, 'password is required']
    },
    email:{
        type: String, 
        required: [true, 'email is required'], 
        trim: true, 
        unique: true
    },
    contact:{
        type: String, 
        required: [true, 'contact is required'], 
        trim: true
    },
    image:{
        type: String,
        // required: [true, 'image is required']
    }, 
    orders:[{
        type: mongoose.Types.ObjectId,
        ref:'Order'
    }]
})


const user = mongoose.model('User', schema)
export default user;