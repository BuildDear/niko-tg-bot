import { MongoClient } from 'mongodb';
import {Product} from "./productModel.js";

import dotenv from 'dotenv';
dotenv.config();

export class MongoDatabase {
    constructor() {
        this.client = new MongoClient(process.env.MONGO_URL);
    }

    async connect() {
        try {
            await this.client.connect();
            const dbName = this.client.db().databaseName;
            console.log('Connected to databaseMongo:', dbName);
            this.db = this.client.db(process.env.MONGO_NAME);
            this.collection = this.db.collection(process.env.MOBGO_COLLECTION_PRODUCTS);
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }

    async insertProduct(productData,ctx) {
        try {

            await this.client.db(process.env.MONGO_NAME).collection(process.env.MOBGO_COLLECTION_PRODUCTS).insertOne(productData);
            console.log('Product inserted into databaseMongo ');
            ctx.reply("Успішно збережено в базу даних")
        } catch (error) {
            console.error('Error inserting product into databaseMongo:', error);
            console.error(error.stack);
        }
    }
}

