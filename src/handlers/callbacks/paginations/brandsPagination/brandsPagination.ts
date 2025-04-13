import { getAllBrands, getBrandsPerPage } from "services/brandService";
import { Context } from "telegraf";
import { getPaginatedInlineKeyboard } from "utils/pagination";
import { CallbackQuery } from "@telegraf/types";
import { renderPaginatedBrandButtons } from "constants/buttons/renderPaginatedButtons";
import { ERROR_MESSAGES } from "constants/messages";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";
export const registerBrandsPaginations = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
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
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
