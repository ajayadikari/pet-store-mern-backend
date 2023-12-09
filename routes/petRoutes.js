import pet from "../models/petModel.js";
import express from 'express'
import { getAllPets, getPet, getPetByName, getPetsWithFilters, deletePet } from "../controllers/petController.js";

const router = express.Router();


router.route('/get-all-pets')
    .get(getAllPets)

router.route('/get-pet/:id')
    .get(getPet)

router.route('/get-pet')
    .get(getPetsWithFilters)

router.route('/get-pet-by-name/:name')
    .get(getPetByName)

router.route('/delete-pet/:id')
    .delete(deletePet)

export default router