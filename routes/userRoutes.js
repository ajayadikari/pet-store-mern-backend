import express from "express";
const router = express.Router()
import { updateUser } from "../controllers/userController.js";
import { isUserLoggedIn } from "../middlewares/auth.js";


router.route('/update-user/:id')
    .put(isUserLoggedIn, updateUser)


export default router