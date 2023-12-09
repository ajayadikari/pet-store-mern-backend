import user from "../models/userModel.js";

const updateUser = async (req, res) => {
    const { name, email, contact, address, image, password } = req.body;
    const {id} = req.params;
    try {
        const userToUpdate = await user.findById(id);

        if (!userToUpdate) {
            return res.status(404).json({
                success: false,
                message: 'user not found',
            });
        }
        userToUpdate.name = name || userToUpdate.name;
        userToUpdate.email = email || userToUpdate.email;
        userToUpdate.contact = contact || userToUpdate.contact;
        userToUpdate.address = address || userToUpdate.address;
        userToUpdate.image = image || userToUpdate.image;

        if (password) {
            const hashedPassword = await hashPassword(password);
            userToUpdate.password = hashedPassword;
        }
        await userToUpdate.save();

        return res.status(200).json({
            success: true,
            message: 'user updated successfully',
            updatedUser: userToUpdate,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error updating user',
        });
    }

}








export {updateUser}