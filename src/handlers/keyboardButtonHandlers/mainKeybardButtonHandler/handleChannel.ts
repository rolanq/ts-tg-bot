import { CHANNEL_BUTTON } from "constants/buttons/buttons";
import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { Context } from "telegraf";

export const handleChannel = async (ctx: Context) => {
  try {
    await ctx.reply(MESSAGES.CHANNEL_MESSAGE, {
      reply_markup: { inline_keyboard: CHANNEL_BUTTON },
    });
  } catch (error) {
    await ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
