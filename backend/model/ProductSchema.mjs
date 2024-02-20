import mongoose, { Schema, Document } from "mongoose";

/**
 * @typedef {Object} Product
 * @property {string} productid - The unique identifier for the product.
 * @property {string} product - The name of the product.
 * @property {string} description - The description of the product.
 * @property {string} img - The URL or path to the product image.
 * @property {number} price - The price of the product.
 * @property {string} category - The category to which the product belongs.
 */

/**
 * Mongoose schema for the Product model.
 *
 * @type {Schema<Product & Document>}
 */
const ProductSchema = new Schema({
    productid: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

/**
 * Mongoose model for the Product schema.
 *
 * @type {import("mongoose").Model<Product & Document>}
 */
const ProductModel = mongoose.model('Products', ProductSchema);

export default ProductModel;