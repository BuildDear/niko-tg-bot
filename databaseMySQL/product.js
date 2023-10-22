// Importing an instance of the MySQL database from another module.
import {mySQLDatabase} from "../main/bot.js";

// Defining a class to handle operations related to a 'Product'.
export class Product {

    // Static method to initialize a product data object with the provided parameters.
    static async initProductData(kindOfAnimal, typeOfProduct, nameOfProduct, priceOfProduct, descriptionOfProduct, quantityOfProduct, isShown, categoryId)
    {
        return {
            kindOfAnimal: kindOfAnimal,
            typeOfProduct: typeOfProduct,
            nameOfProduct: nameOfProduct,
            priceOfProduct: priceOfProduct,
            descriptionOfProduct: descriptionOfProduct,
            quantityOfProduct: quantityOfProduct,
            isShown: isShown,
            categoryId: categoryId
        };
    }

    // Static method to fetch all products from the database and send them as a response in a chat context.
    static showAllProducts(ctx)
    {
        // SQL query to select all products.
        const query = 'SELECT * FROM products_product';

        // Execute the query using the imported database instance.
        mySQLDatabase.executeQuery(query, (err, results) => {
            if (err)
            {
                // If there's an error, log it and notify the user in the chat context.
                console.error('Error querying the database for products', err);
                ctx.reply('There was an error fetching data from the products database');
            }
            else
            {
                // If successful, process the results and send them as a formatted response.
                const data = results;
                let response = 'Data from the table:\n';

                // Iterating through each row and building a formatted string.
                for (const row of data)
                {
                    response +=
                        `==================\n` +
                        `⚙️ID:\t\t${row.id}\n` +
                        `🐾Animal:\t\t${row.animal}\n` +
                        `👜Product:\t\t${row.type}\n` +
                        `⌨️Name:\t\t${row.name}\n` +
                        `💷Price:\t\t${row.price}\n` +
                        `🧾Description:\n\t${row.description}\n\t` +
                        `🎲Quantity:\t\t${row.quantity}\n\t`+
                        `📲isShown:\t\t${row.isShown}\n` +
                        `=================\n`;
                }

                // Send the formatted string as a reply in the chat context.
                ctx.reply(response);
            }
        });
    }

    // Static method to insert a product into the database.
    static insertProductToDatabase(productData,ctx)
    {
        // SQL query to insert a new product with placeholders for data.
        const insertQuery = `INSERT INTO 
        products_product (animal, type, name, price, description, quantity, isShown, category_id) 
        VALUES ('${productData.kindOfAnimal}', '${productData.typeOfProduct}', '${productData.nameOfProduct}', 
        ${productData.priceOfProduct}, '${productData.descriptionOfProduct}',${productData.quantityOfProduct}, ${productData.isShown}, ${productData.categoryId})`;

        // Extracting values from the product data to be inserted.
        const values = [
            productData.kindOfAnimal,
            productData.typeOfProduct,
            productData.nameOfProduct,
            productData.priceOfProduct,
            productData.descriptionOfProduct,
            productData.quantityOfProduct,
            productData.isShown,
            productData.categoryId
        ];

        // Execute the insertion using the imported database instance.
        mySQLDatabase.executeQuery(insertQuery, values, (err, results) => {
            if (err)
            {
                // If there's an error, log it and notify the user in the chat context.
                console.error("Error inserting data into the products database", err);
                ctx.reply("Error inserting data into the products database");
            }
            else
            {
                // If successful, log the success and notify the user in the chat context.
                console.log("Data successfully saved to the products database");
                ctx.reply("Data successfully saved to the products database");
            }
        });
    }
}
