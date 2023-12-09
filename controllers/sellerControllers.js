import pet from "../models/petModel.js"
import seller from "../models/sellerModel.js";

const getPets = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await pet.findById({ _id: id });
        res.status(200).json({
            success: true,
            message: 'seller pets fetched successfully',
            data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
}

const createPet = async (req, res) => {
    try {
        const { user } = req.user;
        const ownerId = user._id
        const newPet = await new pet({
            ...req.body, 
            ownerId: ownerId
        }).save();

        const data = await seller.findByIdAndUpdate(user._id, { $push: { pets: newPet._id } });
        console.log(data, 'updated user data')

        res.status(200).json({
            success: true,
            message: 'pet added to your store successfully',
            newPet
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}


const getSeller = async (req, res) => {
    try {
        const { id } = req.params
        const user = await seller.findById(id).populate('pets').exec()
        res.status(200).json({
            success: true,
            message: 'seller fetched successfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'error while fetching seller'
        })
    }
}

const updateSeller = async (req, res) => {
    const { name, email, contact, address, image, password } = req.body;

    try {
        const sellerToUpdate = await Seller.findById(id);

        if (!sellerToUpdate) {
            return res.status(404).json({
                success: false,
                message: 'Seller not found',
            });
        }
        sellerToUpdate.name = name || sellerToUpdate.name;
        sellerToUpdate.email = email || sellerToUpdate.email;
        sellerToUpdate.contact = contact || sellerToUpdate.contact;
        sellerToUpdate.address = address || sellerToUpdate.address;
        sellerToUpdate.image = image || sellerToUpdate.image;

        if (password) {
            const hashedPassword = await hashPassword(password);
            sellerToUpdate.password = hashedPassword;
        }
        await sellerToUpdate.save();

        return res.status(200).json({
            success: true,
            message: 'Seller updated successfully',
            updatedSeller: sellerToUpdate,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error updating seller',
        });
    }

}




export { getPets, createPet, getSeller, updateSeller }