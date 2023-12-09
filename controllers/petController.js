import pet from "../models/petModel.js";

const getAllPets = async (req, res) => {
    try {
        const pets = await pet.find({}).populate('').exec()
        res.status(200).json({
            success: true,
            message: 'pets fetched successfully',
            pets
        })
    } catch (error) {
        console.log(error)
    }
}

const getPet = async (req, res) => {
    try {
        const { id } = req.params;
        const petDetails = await pet.findById(id);
        res.status(200).json({
            success: true,
            message: 'pet details fetched successfully',
            petDetails
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'pet details failed to fetch'
        })
    }
}

const getPetByName = async (req, res) => {
    try {
        const { name } = req.params
        const petDetails = await pet.findOne({ name: name })
        res.status(200).json({
            success: true,
            message: 'pet fetched successfully',
            petDetails
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'failed to fetch pet details',
            error
        })
    }
}

const getPetsWithFilters = async(req, res) =>{
    try {
        const queries = req.query;
        const min = queries.min;
        const max = queries.max;

        const pets = await pet.find({price:{$gte: min, $lte: max,}})

        res.status(200).json({
            success: true, 
            message: `pets in the range of ${min} and ${max}`, 
            pets
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false, 
            message: 'couldnt get pets in the range'
        })
    }
}

const deletePet = async(req, res) =>{
    try {
        const {id} = req.params
        const resp = await pet.findByIdAndDelete(id)
        res.status(200).json({
            success: true, 
            message: 'successfully removed pet from your store', 
            resp
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false, 
            message: 'error while removing pet from store'
        })
    }
}

export { getAllPets, getPet, getPetByName, getPetsWithFilters, deletePet };