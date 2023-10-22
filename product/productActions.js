// Import necessary modules and buttons
import { typeOfProductButtonsDog } from "../Buttons/Dog/generalDog.js";
import { typeOfProductButtonsCat } from "../Buttons/Cat/generalCat.js";
import { typeOfProductButtonsBird } from "../Buttons/Bird/generalBird.js";
import { typeOfProductButtonsFish } from "../Buttons/Fish/generalFish.js";
import { confirmationButtons, kindOfAnimalButtons } from "../Buttons/generalButtons.js";
import { sessionVariables } from "../main/sessionManager.js";

// Function to check if a text is a positive number
const isPositiveNumber = text => {
    const numericValue = parseFloat(text);
    return !isNaN(numericValue) && numericValue > 0;
};

// Function to send a message with a delay
const sendWithDelay = (ctx, message, delay = 1000, markup) => {
    setTimeout(() => {
        ctx.reply(message, markup);
    }, delay);
};

// Function to send a confirmation message with a delay
export const sendConfirmWithDelay = ctx => {
    sendWithDelay(ctx, "Підтвердити створення продукту", 2000, confirmationButtons);
};

// Function to set up product creation process
export const setupProduct = bot => {
    bot.action("create", ctx => {
        ctx.reply("Оберіть для якої тварини", kindOfAnimalButtons);
    });
};

// Function to check if the user is verified and provide product information
export const isVerified = (ctx, isVerified, descriptionHandler) => {
    if (isVerified) {
        if (descriptionHandler) {
            // Provide information about the product and ask for confirmation
            ctx.reply(`Всі дані, які ви вказали:
                Тварина: ${sessionVariables.kindOfAnimal}
                Продукт: ${sessionVariables.typeOfProduct}
                Назва продукту: ${sessionVariables.nameOfProduct}
                Ціна продукту: ${sessionVariables.priceOfProduct}
                Опис продукту: ${sessionVariables.descriptionOfProduct}
                Кількість одиниць продукту: ${sessionVariables.quantityOfProduct}`);
            sendConfirmWithDelay(ctx);
        } else {
            ctx.reply("Спочатку вкажіть вищесказані параметри");
        }
    } else {
        // Notify the user to start with "/start" for verification
        ctx.reply("Щоб загрузити фото потрібно спочатку пройти верифікацію\n/start");
    }
};

// Function to set the type of animal
export const setTypeOfAnimal = bot => {
    bot.action("dog", ctx => {
        sessionVariables.animal = "dog";
        ctx.editMessageText("Оберіть тип продукту", typeOfProductButtonsDog);
    });

    bot.action("cat", ctx => {
        sessionVariables.animal = "cat";
        ctx.editMessageText("Оберіть тип продукту", typeOfProductButtonsCat);
    });

    bot.action("bird", ctx => {
        sessionVariables.animal = "bird";
        ctx.editMessageText("Оберіть тип продукту", typeOfProductButtonsBird);
    });

    bot.action("fish", ctx => {
        sessionVariables.animal = "fish";
        ctx.editMessageText("Оберіть тип продукту", typeOfProductButtonsFish);
    });
};

// Function to set the type of product
export const setTypeOfProduct = bot => {
    bot.action(["feed", "medicine", "accessories", "cells", "aquariums"], ctx => {
        sessionVariables.typeOfProduct = ctx.match.input;
        ctx.reply("Вкажіть ім'я продукту");
    });
};

// Function to set the name of the product
export const setName = bot => {
    bot.on("text", ctx => {
        if (sessionVariables.step === 'name') {
            sessionVariables.nameOfProduct = ctx.message.text;
            ctx.reply("Вкажіть ціну продукту");
            sessionVariables.step = 'price';
        }
    });
};

// Function to set the price of the product
export const setPrice = bot => {
    bot.on("text", ctx => {
        if (sessionVariables.step === 'price' && isPositiveNumber(ctx.message.text)) {
            sessionVariables.priceOfProduct = ctx.message.text;
            ctx.reply("Вкажіть опис продукту");
            sessionVariables.step = 'description';
        } else {
            ctx.reply("Будь ласка, введіть коректну ціну.");
        }
    });
};

// Function to set the description of the product
export const setDescription = bot => {
    bot.on("text", ctx => {
        if (sessionVariables.step === 'description') {
            sessionVariables.descriptionOfProduct = ctx.message.text;
            ctx.reply("Вкажіть кількість продукту");
            sessionVariables.step = 'quantity';
        }
    });
};

// Function to set the quantity of the product
export const setQuantity = bot => {
    bot.on("text", ctx => {
        if (sessionVariables.step === 'quantity' && isPositiveNumber(ctx.message.text)) {
            sessionVariables.quantityOfProduct = ctx.message.text;
            ctx.reply("Введення даних завершено! Підтвердіть інформацію.");
            sendConfirmWithDelay(ctx);
        } else {
            ctx.reply("Будь ласка, введіть коректну кількість.");
        }
    });
};
