// Import the necessary modules from the mongoose library
import mongoose from 'mongoose';

// Destructure the Schema and model objects from mongoose
const { Schema, model } = mongoose;

// Define a schema for the 'Product' document in MongoDB
const productSchema = new Schema({
    animal: { type: String, required: true },      // Type of animal associated with the product
    product: { type: String, required: true },     // Type of product
    name: { type: String, required: true },        // Name of the product
    price: { type: Number, required: true },        // Price of the product
    description: { type: String, required: true },  // Description of the product
    photo: { type: String, required: true },        // URL or path to the product's photo
    isShown: { type: Boolean, required: true }      // Flag indicating whether the product is shown
});

// Create a 'Product' model using the productSchema
export const Product = model('Product', productSchema);
