//import Products from '../model/employees.json' assert { type: "json" };
import Products from "../model/ProductSchema.mjs";

const getAllProducts = async (req, res) => {
    const employees = await Products.find();
    if (!employees) return res.status(204).json({ 'message': 'No employees found.' });
    res.json(employees);
};
// "message": "First and last names are required"
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

const updateProduct = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const employee = await Products.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    const result = await employee.save();
    res.json(result);
};

const deleteProduct = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Product ID required.' });
    const employee = await Products.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    const result = await employee.deleteOne(); //{ _id: req.body.id }
    res.json(result);
};

const getProduct = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Product ID required.' });
    const employee = await Products.findOne({ _id: req.params.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.params.id}.` });
    }
    res.json(employee);
};

export default {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProduct
};