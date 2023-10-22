// Import necessary modules and classes
import { MongoClient } from 'mongodb';
import { Product } from "./productModel.js";

// Import and configure dotenv for loading environment variables
import dotenv from 'dotenv';
dotenv.config();

// Define a class for interacting with a MongoDB database
export class MongoDatabase {
    constructor() {
        // Initialize a MongoDB client with the connection URL from environment variables
        this.client = new MongoClient(process.env.MONGO_URL);
    }

    // Function to connect to the MongoDB database
    async connect() {
        try {
            // Connect to the MongoDB server using the provided URL
            await this.client.connect();

            // Get the name of the connected database
            const dbName = this.client.db().databaseName;
            console.log('Connected to databaseMongo:', dbName);

            // Set the database and collection properties for later use
            this.db = this.client.db(process.env.MONGO_NAME);
            this.collection = this.db.collection(process.env.MOBGO_COLLECTION_PRODUCTS);
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }

    // Function to insert a product document into the MongoDB collection
    async insertProduct(productData, ctx) {
        try {
            // Insert the provided product data into the specified collection
            await this.client.db(process.env.MONGO_NAME).collection(process.env.MOBGO_COLLECTION_PRODUCTS).insertOne(productData);
            console.log('Product inserted into databaseMongo ');

            // Send a success message to the user via the provided context (ctx)
            ctx.reply("Успішно збережено в базу даних");
        } catch (error) {
            console.error('Error inserting product into databaseMongo:', error);
            console.error(error.stack);
        }
    }
}
