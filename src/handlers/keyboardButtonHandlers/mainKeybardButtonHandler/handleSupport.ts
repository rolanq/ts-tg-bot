import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { ERROR_MESSAGES } from "constants/messages";
import { MESSAGES } from "constants/messages";
import { Context } from "telegraf";

export const handleSupport = async (ctx: Context) => {
  try {
    await ctx.deleteMessage();

    return ctx.reply(MESSAGES.SUPPORT_MESSAGE, {
      reply_markup: {
        inline_keyboard: CLOSE_BUTTONS(),
      },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
