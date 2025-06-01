import { getAllBrands, getBrandsPerPage } from "services/brandService";
import { Context } from "telegraf";
import { getPaginatedInlineKeyboard } from "utils/pagination";
import { CallbackQuery } from "@telegraf/types";
import {
  renderPaginatedBrandButtons,
  renderPaginatedBrandButtonsAdmin,
} from "constants/buttons/renderPaginatedButtons";
import { ERROR_MESSAGES } from "constants/messages";
import { CLOSE_BUTTONS, STEP_BACK_BUTTON } from "constants/buttons/buttons";
import { getUserById } from "services/User";
import { USER_STATE_ENUM } from "constants/config";
export const registerBrandsPaginations = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const user = await getUserById(ctx.from.id.toString());

    if (!user) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }
    const isBrandsEdit =
      user.isAdmin && user.state === USER_STATE_ENUM.EDIT_BRANDS;

    const page = (callbackQuery as CallbackQuery.DataQuery).data.split(":")[1];

    const brands = await getBrandsPerPage(Number(page));

    const keyboard = getPaginatedInlineKeyboard(
      brands.brands,
      isBrandsEdit
        ? renderPaginatedBrandButtonsAdmin
        : renderPaginatedBrandButtons,
      {
        buttonCallback: "page_brands",
        totalItems: brands.total,
        currentPage: Number(page),
        isLastPage: brands.isLastPage,
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
