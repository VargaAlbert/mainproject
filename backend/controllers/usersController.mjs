import User from '../model/UserSchema.mjs';

/**
 * Retrieves all users from the database.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A promise that resolves with the list of users.
 */
const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users || users.length === 0) {
        return res.status(204).json({ 'message': 'No users found' });
    }
    res.json(users);
}

/**
 * Deletes a user from the database.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A promise that resolves with the deletion result.
 */
const deleteUser = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ "message": 'User ID required' });
    }
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
}

/**
 * Retrieves a specific user from the database by ID.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A promise that resolves with the retrieved user.
 */
const getUser = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ "message": 'User ID required' });
    }
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}

export default {
    getAllUsers,
    deleteUser,
    getUser,
};

