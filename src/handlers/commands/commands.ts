import { Context } from "telegraf";
import { MESSAGES } from "constants/messages";
import { getMainKeyboard } from "keyboards/main";

export function handleStart(ctx: Context) {
  return ctx.reply(MESSAGES.WELCOME, {
    reply_markup: getMainKeyboard(),
  });
}
