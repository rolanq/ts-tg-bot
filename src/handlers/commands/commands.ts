import { Context } from "telegraf";
import { ERROR_MESSAGES, MESSAGES, RULES_MESSAGE } from "constants/messages";
import { getMainKeyboard } from "keyboards/main";
import { createUserIfNotExists, getUserById } from "services/User";
import { ACCEPT_RULES_BUTTONS } from "constants/buttons/buttons";

export async function handleStart(ctx: Context) {
  try {
    if (!ctx.from?.id) {
      ctx.reply(ERROR_MESSAGES.ERROR);
      return;
    }

    const user = await getUserById(ctx.from?.id.toString());

    if (!user) {
      return ctx.reply(RULES_MESSAGE, {
        reply_markup: { inline_keyboard: ACCEPT_RULES_BUTTONS },
      });
    }

    return ctx.reply(MESSAGES.WELCOME, {
      reply_markup: getMainKeyboard(),
    });
  } catch (error) {
    ctx.reply(ERROR_MESSAGES.ERROR);
  }
}
