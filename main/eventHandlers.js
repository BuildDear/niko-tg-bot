import { createAndUploadFile } from "../API`S/Google/GoogleAPI.js";
import { sessionVariables } from "./sessionManager.js";
import axios from 'axios';
import fs from "fs";
import {userStartVerify} from "../user/userActions.js";


export const handleText = async ctx => {
    try {
        const text = ctx.message.text;

        switch (sessionVariables.step)
        {
            case 'verify':

                sessionVariables.isVerified = userStartVerify(text);
                if (sessionVariables.isVerified)
                {
                    sessionVariables.step = 'name';
                    ctx.reply('Введіть назву продукту');
                }
                else
                {
                    ctx.reply('Неправильний пароль. Спробуйте ще раз.');
                }
                break;

            case 'name':

                if (sessionVariables.nameOfProduct)
                {
                    sessionVariables.step = 'price';
                    ctx.reply('Введіть ціну продукту');
                }
                break;

            case 'price':

                if (sessionVariables.priceOfProduct)
                {
                    sessionVariables.step = 'description';
                    ctx.reply('Введіть опис продукту');
                }
                break;

            case 'description':

                if (sessionVariables.descriptionOfProduct)
                {
                    sessionVariables.step = 'quantity';
                    ctx.reply('Введіть кількість продукту');
                }
                break;

            case 'quantity':

                if (sessionVariables.quantityOfProduct)
                {
                    sessionVariables.step = null;
                    ctx.reply('Дякуємо! Ви успішно ввели всю інформацію про продукт.');
                }
                break;

            default:
                ctx.reply('Непередбачуваний стан. Будь ласка, почніть спочатку.');
                break;
        }

    } catch (error)
    {
        console.error("Error in handleText:", error);
        ctx.reply("An error occurred. Please try again.");
    }
};

export const handlePhoto = async ctx => {
    try {
        let fileLink = await ctx.telegram.getFileLink(ctx.message.photo[0]);
        let response = await axios.get(fileLink, { responseType: 'stream' });
        let tmpFilePath = `/tmp/${ctx.message.photo[0].file_id}.jpg`;
        let writer = fs.createWriteStream(tmpFilePath);
        response.data.pipe(writer);

        writer.on('finish', async () => {
            await createAndUploadFile(ctx, tmpFilePath);
            ctx.reply("Your photo has been uploaded to Google Drive!");
        });

        writer.on('error', (error) => {
            console.log(`Error downloading the file: ${error.message}`);
        });

    } catch (error)
    {
        console.error("Error in handlePhoto:", error);
        ctx.reply("An error occurred while processing the photo. Please try again.");
    }
};

export const handleConfirm = async ctx => {
    try {
        let productData = await Product.initProductData(kindOfAnimal, typeOfProduct, nameOfProduct, priceOfProduct, descriptionOfProduct, quantityOfProduct, isShown, categoryId);

        Product.insertProductToDatabase(productData, ctx); // PRODUCT
        await Admin.perform(ctx);

    } catch (error) {
        console.error("Error in handleConfirm:", error);
        ctx.reply("An error occurred. Please try again.");
    }
};
