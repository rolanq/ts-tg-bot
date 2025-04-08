import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { ERROR_MESSAGES } from "constants/messages";
import { getTextAndKeyboardSearch } from "handlers/common/getTextAndKeyboardSearch";
import { Context } from "telegraf";

export const handleSearch = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_SAVED_SEARCH, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const searchParameters = await getTextAndKeyboardSearch(
      ctx.from.id.toString()
    );

    if (!searchParameters) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_SAVED_SEARCH, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await ctx.deleteMessage();

    return ctx.reply(searchParameters.text, {
      reply_markup: { inline_keyboard: searchParameters.keyboard },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
