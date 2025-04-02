import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { getMainKeyboard } from "keyboards/main";
import { createUserIfNotExists } from "services/User";
import { Context } from "telegraf";

export const acceptRules = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      ctx.reply(ERROR_MESSAGES.ERROR);
      return;
    }

    await ctx.deleteMessage();

    const user = await createUserIfNotExists(
      ctx.from?.id.toString(),
      ctx.from?.username || ""
    );

    if (!user) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_USER);
    }

    return ctx.reply(MESSAGES.WELCOME, {
      reply_markup: getMainKeyboard(),
    });
  } catch (error) {
    return ctx.answerCbQuery(ERROR_MESSAGES.ERROR, { show_alert: true });
  }
};
