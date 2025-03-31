import { CallbackQuery } from "@telegraf/types";
import { ERROR_MESSAGES } from "constants/messages";
import { Context } from "telegraf";
import { getPaginatedInlineKeyboard } from "utils/pagination";
import { renderPaginatedYearButtons } from "constants/buttons/renderPaginatedButtons";
import { getYearsPerPage } from "utils/utils";

export const registerYearsPagination = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery) {
      return ctx.reply(ERROR_MESSAGES.ERROR);
    }

    const page = (callbackQuery as CallbackQuery.DataQuery).data.split(":")[1];

    const years = getYearsPerPage(Number(page));

    const keyboard = getPaginatedInlineKeyboard(
      years.years,
      renderPaginatedYearButtons,
      {
        buttonCallback: "page_years",
        totalItems: years.total,
        currentPage: Number(page),
        isLastPage: years.isLastPage,
      }
    );

    return ctx.editMessageReplyMarkup({
      inline_keyboard: keyboard,
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
