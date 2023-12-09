import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import sellerRoutes from './routes/sellerRoutes.js'
import userRoutes from './routes/userRoutes.js'
import petRoutes from './routes/petRoutes.js'
const app = express();

//configuring .env 
dotenv.config()


//middlewares
app.use(cors())
app.use(express.json())


//routing
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/seller', sellerRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/pet', petRoutes)

//db connection
connectDb();



//server establishment
const port = process.env.PORT;
app.listen(port, () => {
    console.log('server connection successful', port)
})