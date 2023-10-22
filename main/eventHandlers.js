// Import necessary modules and classes
import { createAndUploadFile } from "../API`S/Google/GoogleAPI.js";
import { sessionVariables } from "./sessionManager.js";
import axios from 'axios';
import fs from "fs";
import { userStartVerify } from "../user/userActions.js";

// Handler for text messages
export const handleText = async ctx => {
    try {
        const text = ctx.message.text;

        switch (sessionVariables.step) {
            case 'verify':
                // Verify the user with the entered text (e.g., password)
                sessionVariables.isVerified = userStartVerify(text);
                if (sessionVariables.isVerified) {
                    sessionVariables.step = 'name';
                    ctx.reply('Введіть назву продукту');
                } else {
                    ctx.reply('Неправильний пароль. Спробуйте ще раз.');
                }
                break;

            case 'name':
                // Check if the name of the product is set
                if (sessionVariables.nameOfProduct) {
                    sessionVariables.step = 'price';
                    ctx.reply('Введіть ціну продукту');
                }
                break;

            case 'price':
                // Check if the price of the product is set
                if (sessionVariables.priceOfProduct) {
                    sessionVariables.step = 'description';
                    ctx.reply('Введіть опис продукту');
                }
                break;

            case 'description':
                // Check if the description of the product is set
                if (sessionVariables.descriptionOfProduct) {
                    sessionVariables.step = 'quantity';
                    ctx.reply('Введіть кількість продукту');
                }
                break;

            case 'quantity':
                // Check if the quantity of the product is set
                if (sessionVariables.quantityOfProduct) {
                    sessionVariables.step = null;
                    ctx.reply('Дякуємо! Ви успішно ввели всю інформацію про продукт.');
                }
                break;

            default:
                ctx.reply('Непередбачуваний стан. Будь ласка, почніть спочатку.');
                break;
        }

    } catch (error) {
        // Handle any errors that occur and send an error message to the user
        console.error("Error in handleText:", error);
        ctx.reply("An error occurred. Please try again.");
    }
};

// Handler for photo messages
export const handlePhoto = async ctx => {
    try {
        // Get the file link of the photo and download it
        let fileLink = await ctx.telegram.getFileLink(ctx.message.photo[0]);
        let response = await axios.get(fileLink, { responseType: 'stream' });
        let tmpFilePath = `/tmp/${ctx.message.photo[0].file_id}.jpg`;
        let writer = fs.createWriteStream(tmpFilePath);
        response.data.pipe(writer);

        writer.on('finish', async () => {
            // Upload the downloaded photo to Google Drive
            await createAndUploadFile(ctx, tmpFilePath);
            ctx.reply("Your photo has been uploaded to Google Drive!");
        });

        writer.on('error', (error) => {
            console.log(`Error downloading the file: ${error.message}`);
        });

    } catch (error) {
        // Handle any errors that occur during photo processing
        console.error("Error in handlePhoto:", error);
        ctx.reply("An error occurred while processing the photo. Please try again.");
    }
};

// Handler for confirmation action
export const handleConfirm = async ctx => {
    try {
        // Initialize product data and insert it into the database
        let productData = await Product.initProductData(kindOfAnimal, typeOfProduct, nameOfProduct, priceOfProduct, descriptionOfProduct, quantityOfProduct, isShown, categoryId);

        // Insert product into the database and perform any other necessary actions
        Product.insertProductToDatabase(productData, ctx); // PRODUCT
        await Admin.perform(ctx);

    } catch (error) {
        // Handle any errors that occur during confirmation
        console.error("Error in handleConfirm:", error);
        ctx.reply("An error occurred. Please try again.");
    }
};
