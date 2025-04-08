import { Context } from "telegraf";
import { ERROR_MESSAGES } from "constants/messages";
import { dropSavedSearch, updateSavedSearch } from "services/savedSearches";
import { getTextAndKeyboardSearch } from "handlers/common/getTextAndKeyboardSearch";
import { CallbackQuery } from "@telegraf/types";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";
export const handleSearchResetAllFilters = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await dropSavedSearch(ctx.from?.id.toString());

    const message = await getTextAndKeyboardSearch(ctx.from?.id.toString());

    if (!message) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_SAVED_SEARCH, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await ctx.deleteMessage();

    return ctx.reply(message.text, {
      reply_markup: { inline_keyboard: message.keyboard },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};

export const handleSearchResetFilter = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const data = (callbackQuery as CallbackQuery.DataQuery).data;
    const [, selectedFilter] = data.split(":");

    const formattedSelectedFilter =
      selectedFilter === "brand"
        ? "brandId"
        : selectedFilter === "region"
        ? "regionId"
        : selectedFilter === "priceFrom"
        ? "priceFrom"
        : "priceTo";

    await updateSavedSearch(ctx.from?.id.toString(), {
      [formattedSelectedFilter]: null,
    });

    const message = await getTextAndKeyboardSearch(ctx.from.id.toString());

    if (!message) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_SAVED_SEARCH, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await ctx.deleteMessage();

    return ctx.reply(message.text, {
      reply_markup: { inline_keyboard: message.keyboard },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
