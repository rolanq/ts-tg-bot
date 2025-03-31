import { ERROR_MESSAGES } from "constants/messages";
import { USER_STATE_ENUM } from "constants/userState";
import { getTextAndKeyboardSearch } from "handlers/common/getTextAndKeyboardSearch";
import { updateUser } from "services/User";
import { Context } from "telegraf";

export const handleSearch = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_SAVED_SEARCH);
    }

    const searchParameters = await getTextAndKeyboardSearch(
      ctx.from.id.toString()
    );

    if (!searchParameters) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_SAVED_SEARCH);
    }

    await ctx.deleteMessage();

    return ctx.reply(searchParameters.text, {
      reply_markup: { inline_keyboard: searchParameters.keyboard },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
