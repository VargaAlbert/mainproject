import Products from "../model/ProductSchema.mjs";

/**
 * Retrieves all products from the database.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A promise that resolves with the list of products.
 */
const getAllProducts = async (req, res) => {
    const products = await Products.find();
    if (!products || products.length === 0) {
        return res.status(204).json({ 'message': 'No products found.' });
    }
    res.json(products);
};

/**
 * Creates a new product in the database.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A promise that resolves with the newly created product.
 */
const createNewProduct = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required' });
    }
    try {
        const result = await Products.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
};

/**
 * Updates an existing product in the database.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A promise that resolves with the updated product.
 */
const updateProduct = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const product = await Products.findOne({ _id: req.body.id }).exec();
    if (!product) {
        return res.status(204).json({ "message": `No product matches ID ${req.body.id}.` });
    }
    if (req.body?.firstname) product.firstname = req.body.firstname;
    if (req.body?.lastname) product.lastname = req.body.lastname;
    const result = await product.save();
    res.json(result);
};

/**
 * Deletes a product from the database.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A promise that resolves with the deletion result.
 */
const deleteProduct = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'Product ID required.' });
    }
    const product = await Products.findOne({ _id: req.body.id }).exec();
    if (!product) {
        return res.status(204).json({ "message": `No product matches ID ${req.body.id}.` });
    }
    const result = await product.deleteOne();
    res.json(result);
};

/**
 * Retrieves a specific product from the database by ID.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A promise that resolves with the retrieved product.
 */
const getProduct = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'Product ID required.' });
    }
    const product = await Products.findOne({ _id: req.params.id }).exec();
    if (!product) {
        return res.status(204).json({ "message": `No product matches ID ${req.params.id}.` });
    }
    res.json(product);
};

export default {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProduct
};
