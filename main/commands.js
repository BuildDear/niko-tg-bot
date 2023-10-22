// commands.js

import { main } from "../user/userActions.js";
import { Product } from "../databaseMySQL/product.js";

export const handleStartCommand = (ctx, resetSession) => {
    try {
        resetSession();
        ctx.reply('Добрий день! \nВведіть пароль');
    }
    catch (error) {
        console.error("Error in handleStartCommand.", error);
        ctx.reply("An error occurred. Please try again.");
    }
};

export const handleCreateCommand = async (ctx, sessionVariables, bot) => {
    try {
        sessionVariables.sessionCounter++;
        if (sessionVariables.isVerified || sessionVariables.sessionCounter > 1)
        {
            await main(bot, ctx.chat.id);
        }
        else
        {
            ctx.reply("Ви не авторизувались, щоб авторизуватись натисність /start");
        }
    }
    catch (error) {
        console.error("Error in handleCreateCommand:", error);
        ctx.reply("An error occurred. Please try again.");
    }
};

export const handleShowCommand = (ctx, sessionVariables) => {
    try {
        if (sessionVariables.isVerified)
        {
            Product.showAllProducts(ctx);
        }
        else
        {
            ctx.reply("Ви не авторизувались, щоб авторизуватись натисність /start");
        }
    }
    catch (error) {
        console.error("Error in handleShowCommand:", error);
        ctx.reply("An error occurred. Please try again.");
    }
};
