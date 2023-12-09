import jwt from 'jsonwebtoken';
import user from '../models/userModel.js';
import seller from '../models/sellerModel.js';

const isUserLoggedIn = (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token is missing'
            });
        }
        const verified = jwt.verify(token, process.env.SECRET);
        if (!verified) {
            return res.status(500).json({
                success: false,
                message: 'Token verification failed'
            });
        }
        req.user = verified;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error while verifying the token'
        });
    }
};

const isSeller = async (req, res, next) => {
    try {
        const { user } = req;
        const id = user.user._id;
        const foundSeller = await seller.findById({ _id: id });

        if (!foundSeller) {
            return res.status(500).json({
                success: false,
                message: 'Seller not found'
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error while checking seller'
        });
    }
};

export { isUserLoggedIn, isSeller };
