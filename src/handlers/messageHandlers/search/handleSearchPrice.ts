import { Message } from "@telegraf/types";
import { ERROR_MESSAGES } from "constants/messages";
import { USER_STATE_ENUM } from "constants/userState";
import { getTextAndKeyboardSearch } from "handlers/common/getTextAndKeyboardSearch";
import { updateSavedSearch } from "services/savedSearches";
import { getUser } from "services/User";
import { Context } from "telegraf";
import { parseNumberWithAbbreviations } from "utils/utils";

export const handleSearchPrice = async (ctx: Context) => {
  try {
    if (!ctx.from?.id || !ctx.message) {
      return ctx.reply(ERROR_MESSAGES.ERROR);
    }

    const text = (ctx.message as Message.TextMessage).text;
    const user = await getUser(ctx.from.id.toString());

    if (!user) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_USER);
    }

    const [, filter] = user.state.split("_");
    const price = parseNumberWithAbbreviations(text);

    await updateSavedSearch(ctx.from.id.toString(), {
      [filter]: price,
    });

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
