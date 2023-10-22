// Import necessary modules and buttons
import { createProductButtons } from "../Buttons/generalButtons.js";
import { setTypeOfAnimal, setTypeOfProduct, setupProduct } from "../product/productActions.js";

// Initialize variables for tracking incorrect password attempts and blocking
let incorrectAttempts = 0;       // Count of incorrect password attempts
let blockStartTime = null;       // Start time of the blocking period
const blockDuration = 1000;      // Duration of blocking in milliseconds (1 minute)

// Function to verify the user's password
export function userVerifyPassword(text) {
    return text === process.env.PASSWORD; // Compare the provided text with the password in the environment variables
}

// Function to initiate the password verification process
export async function userStartVerify(bot, ctx, chatId, text) {
    if (userVerifyPassword(text)) {
        ctx.reply("Успіх! \n" + "Натисніть /create ,щоб створити продукт");
        return true; // Password is correct
    } else {
        await userIncorrectPassword(bot, chatId); // Password is incorrect, handle incorrect attempt
    }
}

// Function to handle incorrect password attempts
export async function userIncorrectPassword(bot, chatId) {
    if (incorrectAttempts >= 5) {
        if (!blockStartTime) {
            blockStartTime = Date.now();
        }
        const timeRemaining = blockStartTime + blockDuration - Date.now();
        const minutesRemaining = Math.ceil(timeRemaining / (60 * 1000));

        if (timeRemaining > 0) {
            await bot.telegram.sendMessage(chatId, `Ви ввели неправильний пароль. Будь ласка, зачекайте ${minutesRemaining} хвилин(-и)`);
        } else {
            incorrectAttempts = 0; // Reset the incorrect attempts count
            blockStartTime = null; // Reset the block start time
        }
    } else {
        await bot.telegram.sendMessage(chatId, "Ви ввели неправильний пароль");
        incorrectAttempts++; // Increment the count of incorrect attempts
    }
}

// Function to set up the initial product creation process
export async function setup(bot, chatId) {
    // Delay for 2 seconds before sending the product creation message
    setTimeout(async function () {
        await bot.telegram.sendMessage(chatId, "Створити продукт", createProductButtons);
        setupProduct(bot); // Call the function to set up product-related actions
    }, 2000);
}

// Main function to initiate the product creation process
export async function main(bot, chatId) {
    await setup(bot, chatId); // Set up the initial product creation process
    setTypeOfAnimal(bot);     // Set up actions for selecting the type of animal
    setTypeOfProduct(bot);    // Set up actions for selecting the type of product
}
