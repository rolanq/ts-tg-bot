import * as dotenv from "dotenv";
dotenv.config();

import { Telegraf } from "telegraf";
import { registerAllHandlers } from "handlers";

const bot = new Telegraf(process.env.BOT_TOKEN || "");

registerAllHandlers(bot);

bot
  .launch(() => {
    console.log("Бот запущен");
  })
  .catch((err) => {
    console.error("Ошибка при запуске бота:", err);
  });
