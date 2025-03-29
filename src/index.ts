import * as dotenv from "dotenv";
dotenv.config();

import { Telegraf } from "telegraf";
import { registerAllHandlers } from "handlers";
import { session } from "middlewares/session";

const bot = new Telegraf(process.env.BOT_TOKEN || "");

bot.use(session);
registerAllHandlers(bot);

bot
  .launch(() => {
    console.log("Бот запущен");
  })
  .catch((err) => {
    console.error("Ошибка при запуске бота:", err);
  });
