import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productSchema = new Schema({
    animal: { type: String, required: true },
    product: { type: String, required: true},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    photo: {type: String , required: true},
    isShown:{type: Boolean , required: true}
});

export const Product = model('Product', productSchema);

