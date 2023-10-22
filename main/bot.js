import { Telegraf } from "telegraf";
import { sessionVariables, resetSession } from "./sessionManager.js";
import { handleStartCommand, handleCreateCommand, handleShowCommand } from "./commands.js";
import { handleText, handlePhoto, handleConfirm } from "./eventHandlers.js";
import {MYSQL_Database} from "../databaseMySQL/database.js";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);
export const mySQLDatabase = new MYSQL_Database();

bot.command("start", (ctx) => handleStartCommand(ctx, resetSession));
bot.command("create", (ctx) => handleCreateCommand(ctx, sessionVariables, bot));
bot.command("show", (ctx) => handleShowCommand(ctx, sessionVariables));
bot.on('text', handleText);
bot.on('photo', handlePhoto);
bot.action("confirm", handleConfirm);

await bot.launch();
