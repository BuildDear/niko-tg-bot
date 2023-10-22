// Import necessary modules and libraries
import { Telegraf } from "telegraf";
import { sessionVariables, resetSession } from "./sessionManager.js";
import { handleStartCommand, handleCreateCommand, handleShowCommand } from "./commands.js";
import { handleText, handlePhoto, handleConfirm } from "./eventHandlers.js";
import { MYSQL_Database } from "../databaseMySQL/database.js";
import * as dotenv from 'dotenv';

// Load environment variables from a .env file (dotenv is used for this purpose)
dotenv.config();

// Create a new instance of the Telegraf bot using the BOT_TOKEN from environment variables
const bot = new Telegraf(process.env.BOT_TOKEN);

// Create a new instance of the MySQL database
export const mySQLDatabase = new MYSQL_Database();

// Define command handlers for various Telegram commands
bot.command("start", (ctx) => handleStartCommand(ctx, resetSession));
bot.command("create", (ctx) => handleCreateCommand(ctx, sessionVariables, bot));
bot.command("show", (ctx) => handleShowCommand(ctx, sessionVariables));

// Define event handlers for text messages and photos
bot.on('text', handleText);
bot.on('photo', handlePhoto);

// Define an action handler for a specific action named "confirm"
bot.action("confirm", handleConfirm);

// Launch the bot, making it listen for incoming updates and events
await bot.launch();
