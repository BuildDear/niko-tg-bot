import {createProductButtons} from "../Buttons/generalButtons.js";
import {
    setTypeOfAnimal,
    setTypeOfProduct, setupProduct
} from "../product/productActions.js";

let incorrectAttempts = 0;
let blockStartTime = null; // Час початку блокування
const blockDuration = 1000; // Тривалість блокування в мілісекундах (1 хвилин)

export function userVerifyPassword(text)
{
    return text === process.env.PASSWORD;
}
export async function userStartVerify(bot,ctx,chatId,text)
{
    if(userVerifyPassword(text))
    {
        ctx.reply("Успіх! \n"+"Натисніть /create ,щоб створити продукт");
        return true;
    }
    else
    {
       await userIncorrectPassword(bot,chatId);
    }

}
export async function userIncorrectPassword(bot,chatId)
{
    if (incorrectAttempts >= 5)
    {
        if (!blockStartTime)
        {
            blockStartTime = Date.now();
        }
        const timeRemaining = blockStartTime + blockDuration - Date.now();
        const minutesRemaining = Math.ceil(timeRemaining / (60 * 1000));

        if (timeRemaining > 0)
        {
            await bot.telegram.sendMessage(chatId,`Ви ввели неправильний пароль. Будь ласка, зачекайте ${minutesRemaining} хвилин(-и)`);
        }
        else
        {
            incorrectAttempts = 0;
            blockStartTime = null;
        }
    }
    else
    {
        await bot.telegram.sendMessage(chatId, "Ви ввели непрвильний пароль");
        incorrectAttempts++;
    }
}
export async function setup(bot,chatId)
{
    // Затримка на 2 секунди
    setTimeout(async function()
    {
        await bot.telegram.sendMessage(chatId,"Створити продукт",createProductButtons);
        setupProduct(bot);
    }, 1000);
}

export async function main(bot,chatId)
{
    await setup(bot,chatId);
    setTypeOfAnimal(bot);
    setTypeOfProduct(bot);
}
