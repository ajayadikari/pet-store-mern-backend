import express from 'express'
import { getPets, createPet, getSeller, updateSeller } from '../controllers/sellerControllers.js';
import { isUserLoggedIn, isSeller } from '../middlewares/auth.js';
const router = express.Router();

router.route('/get-pets/:id')
    .get(isUserLoggedIn, isSeller, getPets)
router.route('/create-pet')
    .post(isUserLoggedIn, isSeller, createPet);
router.route('/get-seller/:id')
    .get(isUserLoggedIn, isSeller, getSeller)
router.route('update-seller/:id')
    .put(isUserLoggedIn, isSeller, updateSeller)


export default router