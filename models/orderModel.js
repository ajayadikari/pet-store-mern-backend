import mongoose from "mongoose";


const schema = mongoose.Schema({
    sellerId: {
        type: mongoose.Types.ObjectId,
        ref: 'Seller'
    },
    customerIds: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
})


const order = mongoose.model('Order', schema)
export default order;