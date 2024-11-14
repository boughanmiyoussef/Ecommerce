const mongoose = require('mongoose');

// Define the schema for products
const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: String,
    description: String,
    price: {
        type: Number,
        required: true,
    },
    oldPrice: Number,
    image: String,
    color: String,
    rating: {
        type: Number,
        default: 0,
    },
    author: { 
        type: mongoose.Types.ObjectId, 
        ref: "User", // Reference to the User model
        required: true 
    },
});

// Create the model using the corrected schema
const Products = mongoose.model('Product', productsSchema);

// Export the Products model
module.exports = Products;
