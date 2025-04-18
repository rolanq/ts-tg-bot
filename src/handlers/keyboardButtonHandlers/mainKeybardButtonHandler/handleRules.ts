import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { ERROR_MESSAGES, RULES_MESSAGE } from "constants/messages";
import { getBotSettings } from "services/botSettings";
import { Context } from "telegraf";

export const handleRules = async (ctx: Context) => {
  try {
    await ctx.deleteMessage();

    const botSettings = await getBotSettings();

    return ctx.reply(
      RULES_MESSAGE.replace(
        "{supportUsername}",
        botSettings?.SupportUsername || ""
      ),
      {
        reply_markup: {
          inline_keyboard: CLOSE_BUTTONS(),
        },
      }
    );
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
