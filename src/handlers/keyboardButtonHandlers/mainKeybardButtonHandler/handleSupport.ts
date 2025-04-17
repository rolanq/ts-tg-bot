import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { ERROR_MESSAGES } from "constants/messages";
import { MESSAGES } from "constants/messages";
import { getBotSettings } from "services/botSettings";
import { Context } from "telegraf";

export const handleSupport = async (ctx: Context) => {
  try {
    await ctx.deleteMessage();

    const botSettings = await getBotSettings();

    return ctx.reply(
      MESSAGES.SUPPORT_MESSAGE.replace(
        "{supportText}",
        botSettings?.SupportText || ""
    ), {
      reply_markup: {
        inline_keyboard: CLOSE_BUTTONS(),
      },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
