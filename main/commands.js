// Import necessary modules and classes
import { main } from "../user/userActions.js";
import { Product } from "../databaseMySQL/product.js";

// Handler for the "/start" command
export const handleStartCommand = (ctx, resetSession) => {
    try {
        // Reset the session state
        resetSession();

        // Send a welcome message to the user
        ctx.reply('Добрий день! \nВведіть пароль');
    }
    catch (error) {
        // Handle any errors that occur and send an error message to the user
        console.error("Error in handleStartCommand.", error);
        ctx.reply("An error occurred. Please try again.");
    }
};

// Handler for the "/create" command
export const handleCreateCommand = async (ctx, sessionVariables, bot) => {
    try {
        // Increment the session counter
        sessionVariables.sessionCounter++;

        // Check if the user is verified or has already created a session
        if (sessionVariables.isVerified || sessionVariables.sessionCounter > 1) {
            // Call the 'main' function with the bot and chat ID
            await main(bot, ctx.chat.id);
        }
        else {
            // Send a message indicating the user needs to start with "/start" for authorization
            ctx.reply("Ви не авторизувались, щоб авторизуватись натисніть /start");
        }
    }
    catch (error) {
        // Handle any errors that occur and send an error message to the user
        console.error("Error in handleCreateCommand:", error);
        ctx.reply("An error occurred. Please try again.");
    }
};

// Handler for the "/show" command
export const handleShowCommand = (ctx, sessionVariables) => {
    try {
        // Check if the user is verified
        if (sessionVariables.isVerified) {
            // Call the 'showAllProducts' method of the 'Product' class to display products
            Product.showAllProducts(ctx);
        }
        else {
            // Send a message indicating the user needs to start with "/start" for authorization
            ctx.reply("Ви не авторизувались, щоб авторизуватись натисніть /start");
        }
    }
    catch (error) {
        // Handle any errors that occur and send an error message to the user
        console.error("Error in handleShowCommand:", error);
        ctx.reply("An error occurred. Please try again.");
    }
};
