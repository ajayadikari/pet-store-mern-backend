import mongoose, { mongo } from 'mongoose'


const connectDb = async() =>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('db connection successful')
    } catch (error) {
        console.log('error in db connection')
        console.log(error)
    }
}

export default connectDb