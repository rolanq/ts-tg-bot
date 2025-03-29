import { Context } from "telegraf";
import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { getMainKeyboard } from "keyboards/main";
import { createUserIfNotExists } from "services/User";

export async function handleStart(ctx: Context) {
  try {
    if (!ctx.from?.id) {
      ctx.reply(ERROR_MESSAGES.ERROR);
      return;
    }

    await createUserIfNotExists(
      ctx.from?.id.toString(),
      ctx.from?.username || ""
    );

    await ctx.deleteMessage();

    return ctx.reply(MESSAGES.WELCOME, {
      reply_markup: getMainKeyboard(),
    });
  } catch (error) {
    ctx.reply(ERROR_MESSAGES.ERROR);
  }
}
