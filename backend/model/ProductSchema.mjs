import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    product: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    }
});

export default mongoose.model('Products', ProductSchema);