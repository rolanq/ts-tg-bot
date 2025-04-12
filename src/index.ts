import * as dotenv from "dotenv";
dotenv.config();

import { Telegraf } from "telegraf";
import { registerAllHandlers } from "handlers";

const bot = new Telegraf(process.env.BOT_TOKEN || "");

bot.catch((err: unknown, ctx) => {
  console.error(`Ошибка для ${ctx.updateType}:`, err);

  if (
    err &&
    typeof err === "object" &&
    "description" in err &&
    err.description === "Bad Request: message is not modified"
  ) {
    return;
  }

  if (process.env.MAIN_ADMIN_ID) {
    ctx.telegram
      .sendMessage(
        process.env.MAIN_ADMIN_ID,
        `Ошибка в боте:\nТип: ${ctx.updateType}\nОшибка: ${
          err instanceof Error ? err.message : String(err)
        }`
      )
      .catch(console.error);
  }
});

registerAllHandlers(bot);

const startBot = async () => {
  try {
    await bot.launch(() => console.log("Бот запущен"));
  } catch (err: unknown) {
    console.error("Ошибка при запуске бота:", err);

    console.log("Попытка перезапуска через 5 секунд...");
    setTimeout(startBot, 5000);
  }
};

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

startBot();
