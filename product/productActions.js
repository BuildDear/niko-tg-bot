import {typeOfProductButtonsDog} from "../Buttons/Dog/generalDog.js";
import {typeOfProductButtonsCat} from "../Buttons/Cat/generalCat.js";
import {typeOfProductButtonsBird} from "../Buttons/Bird/generalBird.js";
import {typeOfProductButtonsFish} from "../Buttons/Fish/generalFish.js";
import {confirmationButtons, createProductButtons, kindOfAnimalButtons} from "../Buttons/generalButtons.js";


export let animal = "";
export let product = "";

function isPositiveNumber(text)
{
    const numericValue = text;
    return !isNaN(numericValue) && numericValue > 0;
}

function sendPriceWithDelay(ctx)
{
    setTimeout(async function()
    {
        const handleDescription = "Вкажіть ціну продукту";
        ctx.reply(handleDescription);
    }, 1000);
}

function sendDescriptionWithDelay(ctx)
{
    setTimeout(async function()
    {
        const handleDescription = "Вкажіть опис продукту";
        ctx.reply(handleDescription);
    }, 1000);
}

function sendPhotoWithDelay(ctx)
{
    setTimeout(async function()
    {
        const handleDescription = "Надішліть фото продукту";
        ctx.reply(handleDescription);
    }, 1000);
}

export function sendConfirmWithDelay(ctx)
{
    setTimeout(async function()
    {
        const handleDescription = "Підтвердити створення продукту";
        ctx.reply(handleDescription,confirmationButtons);
    }, 2000);
}


export function setupProduct(bot)
{
    bot.action("create", (ctx) => {
        ctx.reply("Оберіть для якої тварини", kindOfAnimalButtons);
    });
}

export function setTypeOfAnimal(bot)
{
    try {
        bot.action("dog", (ctx) => {
            animal = "dog";
            ctx.editMessageText("Оберіть тип продукту", typeOfProductButtonsDog);
        });

        bot.action("cat", (ctx) => {
            animal = "cat";
            ctx.editMessageText("Оберіть тип продукту", typeOfProductButtonsCat);
        });

        bot.action("bird", (ctx) => {
            animal = "bird";
            ctx.editMessageText("Оберіть тип продукту", typeOfProductButtonsBird);
        });

        bot.action("fish", (ctx) => {
            animal = "fish";
            ctx.editMessageText("Оберіть тип продукту", typeOfProductButtonsFish);
        });

    } catch (error) {
        console.error("setTypeOfProduct створила помилку: ", error);
    }
}

export function setTypeOfProduct(bot)
{
    try {
        const actionText = "Вкажіть ім'я продукту";

        bot.action(["feed", "medicine", "accessories", "cells", "aquariums"], (ctx) => {
            ctx.editMessageText(actionText);
            product = ctx.match.input;
        });

    } catch (error)
    {
        console.error("setPriceOfProduct створила помилку: ", error);
    }
}

export function setNameTextHandle(text,ctx)
{
    if (text)
    {
        ctx.reply("Ви вказали ім'я: " + text);
        console.log("Ви вказали ім'я: " + text);
        sendPriceWithDelay(ctx);
        return text;
    }
    else
    {
        ctx.reply("Опис не може бути пустим. Спробуйте ще раз.");
        ctx.reply("Вкажіть опис продукту");
    }
}

export function setPriceTextHandle(text,ctx)
{
    const actionText = "Вкажіть ціну продукту";
    let price = 0;

    if (isPositiveNumber(text))
    {
        ctx.reply("Ви вказали ціну: " + text + " гривень");
        console.log("Ви вказали ціну: " + text + " гривень");
        sendDescriptionWithDelay(ctx);
        return text;
    }
    else
    {
        ctx.reply("Ціна некоректна, спробуйте ще раз ");
        ctx.reply(actionText);
        return null;
    }
}

export function setDescriptionTextHandle(text,ctx)
{
    if (text)
    {
        ctx.reply("Ви вказали опис: " + text);
        console.log("Ви вказали опис: " + text);
        sendPhotoWithDelay(ctx);
        return text;
    }
    else
    {
        ctx.reply("Опис не може бути пустим. Спробуйте ще раз.");
        ctx.editMessageText("Вкажіть опис продукту");
    }
}
