import { CallbackQuery } from "@telegraf/types";
import { ERROR_MESSAGES } from "constants/messages";
import { Context } from "telegraf";
import { getPaginatedInlineKeyboard } from "utils/pagination";
import { renderPaginatedYearButtons } from "constants/buttons/renderPaginatedButtons";
import { getYearsPerPage } from "utils/utils";
import { CLOSE_BUTTONS, STEP_BACK_BUTTON } from "constants/buttons/buttons";

export const registerYearsPagination = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
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
      inline_keyboard: [...keyboard, ...STEP_BACK_BUTTON],
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
