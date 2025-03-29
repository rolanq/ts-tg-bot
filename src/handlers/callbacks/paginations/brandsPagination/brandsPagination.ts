import { getAllBrands, getBrandsPerPage } from "services/brandService";
import { Context } from "telegraf";
import { getPaginatedInlineKeyboard } from "utils/pagination";
import { CallbackQuery } from "@telegraf/types";
import { renderPaginatedBrandButtons } from "utils/pagination/renderPaginatedButtons";
import { ERROR_MESSAGES } from "constants/messages";
export const registerMarksPaginations = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_BRANDS);
    }

    const page = (callbackQuery as CallbackQuery.DataQuery).data.split(":")[1];

    const brands = await getBrandsPerPage(Number(page));

    const keyboard = getPaginatedInlineKeyboard(
      brands.brands,
      renderPaginatedBrandButtons,
      {
        buttonCallback: "page_brands",
        totalItems: brands.total,
        currentPage: Number(page),
        isLastPage: brands.isLastPage,
      }
    );

    return ctx.editMessageReplyMarkup({
      inline_keyboard: keyboard,
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
