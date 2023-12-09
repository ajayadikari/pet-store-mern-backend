import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import Seller from '../models/sellerModel.js'
import jwt from 'jsonwebtoken'



const register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, address, image, isSeller, contact } = req.body
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'name is required'
            })
        }
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'email is required'
            })
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                message: 'password is required'
            })
        }
        if (!confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'confirmPassword is required'
            })
        }
        if (!address) {
            return res.status(400).json({
                success: false,
                message: 'address is required'
            })
        }
        if (!contact) {
            return res.status(400).json({
                success: false,
                message: 'contact is required'
            })
        }

        if (password != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'password and confirm password must be same'
            })
        }

        const user = await User.findOne({ email: email })
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'user already exists'
            })
        }

        const hashPass = await bcrypt.hash(password, 10);

        let newUser = {};

        if (isSeller) {
            newUser = new Seller({
                name: name,
                email: email,
                password: hashPass,
                address: address,
                contact: contact,
            }).save()

            newUser = {
                ...newUser,
                password: undefined
            }
        }
        else {
            newUser = new User({
                name: name,
                email: email,
                password: hashPass,
                address: address,
                contact: contact,
            }).save()

            newUser = {
                ...newUser,
                password: undefined
            }
        }

        res.status(200).json({
            success: true,
            message: 'user registration successful',
            newUser
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'user registration failed',
            error
        })
    }
}


const login = async (req, res) => {
    try {
        const { email, password, isSeller } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'email required'
            })
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                message: 'password required'
            })
        }

        let user = {}

        if (isSeller) {
            user = await Seller.findOne({ email: email })
            if (!user) {
                return res.status(500).json({
                    success: false,
                    message: 'user not found'
                })
            }
        }
        else {
            user = await User.findOne({ email: email })
            if (!user) {
                return res.status(500).json({
                    success: false,
                    message: 'user not found'
                })
            }
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(500).json({
                success: false,
                message: 'Entered wrong password'
            });
        }

        const payload = {
            user: user
        }

        const token = jwt.sign(payload, process.env.SECRET)

        user.password = null;

        res.status(200).json({
            success: true,
            message: 'login successful',
            user,
            isSeller,
            token
        })

    } catch (error) {
        console.log('error while logging in', error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error
        })
    }
}




export { login, register }