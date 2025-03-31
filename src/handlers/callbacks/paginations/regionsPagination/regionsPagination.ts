import { Context } from "telegraf";
import { CallbackQuery } from "@telegraf/types";
import { getRegionsPerPage } from "services/regionService";
import { getPaginatedInlineKeyboard } from "utils/pagination";
import { renderPaginatedRegionButtons } from "constants/buttons/renderPaginatedButtons";
import { ERROR_MESSAGES } from "constants/messages";

export const registerRegionPagination = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_REGIONS);
    }

    const page = (callbackQuery as CallbackQuery.DataQuery).data.split(":")[1];

    const regions = await getRegionsPerPage(Number(page));

    const keyboard = getPaginatedInlineKeyboard(
      regions.regions,
      renderPaginatedRegionButtons,
      {
        buttonCallback: "page_regions",
        totalItems: regions.total,
        currentPage: Number(page),
        isLastPage: regions.isLastPage,
      }
    );

    return ctx.editMessageReplyMarkup({
      inline_keyboard: keyboard,
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
