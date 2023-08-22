import {Telegraf} from "telegraf";
import dotenv from 'dotenv';
import {main, userStartVerify} from "./user/userActions.js";
import {
    animal, product,
    sendConfirmWithDelay,
    setDescriptionTextHandle,
    setNameTextHandle,
    setPriceTextHandle
} from "./product/productActions.js";
import {Database} from "./database/database.js";


dotenv.config();
const tgToken = process.env.BOT_TOKEN;

const bot = new Telegraf(tgToken);
const database = new Database();

const verifyStart = "Добрий день! \n" + "Введіть пароль ";
let sessionCounter = 0;

let kindOfAnimal = "";
let typeOfProduct = "";
let nameOfProduct = "";
let priceOfProduct = "";
let descriptionOfProduct = "";
let photoID = "";

let isVerified = false;
let isVerifiedHandler = false;
let nameHandler = false;
let priceHandler = false;
let textHandler = false;


bot.command("start", async ctx => {

    const chatId = ctx.chat.id;

    isVerifiedHandler = false;
    priceHandler = false;
    nameHandler = false;
    textHandler = false;
    isVerified = false;

    ctx.reply(verifyStart);

    bot.on("text",  async ctx => {

        const text = ctx.message.text;

        if(!isVerifiedHandler)
        {
            isVerified =  await userStartVerify(bot,ctx,chatId,text);
            if(isVerified)
                isVerifiedHandler = true;
        }
        else if(!nameHandler)
        {
            nameOfProduct = setNameTextHandle(text,ctx);
            console.log("Ім'я:" + nameOfProduct);
            nameHandler = true;
        }
        else if(!priceHandler)
        {
            priceOfProduct = setPriceTextHandle(text,ctx);
            if(priceOfProduct)
            {
                console.log("Ціна:" + priceOfProduct);
                priceHandler = true;
            }
        }
        else if(!textHandler)
        {
            descriptionOfProduct = setDescriptionTextHandle(text,ctx);
            console.log("Опис:" + descriptionOfProduct);
            textHandler = true;
        }
    });
});

bot.command("create", async ctx => {

    const chatId = ctx.chat.id;
    sessionCounter++;

    if(sessionCounter > 1)
    {
        priceHandler = false;
        nameHandler = false;
        textHandler = false;
    }

    if(isVerified)
    {
        await main(bot, chatId);
    }
    else
    {
        ctx.reply("Ви не авторизувались, щоб авторизуватись натисність /start");
    }
});

bot.on('photo', async (ctx) => {

    const photo = ctx.message.photo.pop();
    const fileId = photo.file_id;

    kindOfAnimal = animal;
    typeOfProduct = product;

    if(isVerified)
    {
        if(textHandler)
        {
            photoID = fileId;
            ctx.reply("Всі дані,які ви вказали \n" +
                "Тварина :  " + kindOfAnimal + ". \n" +
                "Продукт :  " + typeOfProduct + ". \n" +
                "Назва продукту :   " + nameOfProduct  + ". \n" +
                "Ціна продукту :    " + priceOfProduct  + ". \n" +
                "Опис продукту :    " + descriptionOfProduct  + ". \n"
            );
            sendConfirmWithDelay(ctx);

            console.log("Фото ІД" + photoID);
        }
        else
        {
            ctx.reply("Спочатку вкажіть вищесказані параметри");
            ctx.deleteMessage();
        }
    }
    else
    {
        ctx.reply("Щоб загрузити фото потрібно спочатку пройти верифікацію \n"+
        "/start");
        ctx.deleteMessage();
    }
});

bot.action("confirm", async (ctx) => {




    const productData = {
        animal: kindOfAnimal,
        product: typeOfProduct,
        name: nameOfProduct,
        price: priceOfProduct,
        description: descriptionOfProduct,
        photo: photoID,
        isShown:false //The product is not yet displayed on the page
    };

    await database.connect();
    await database.insertProduct(productData,ctx);
});


await bot.launch();

