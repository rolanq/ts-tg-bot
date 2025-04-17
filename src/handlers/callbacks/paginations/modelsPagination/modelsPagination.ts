import { getModelsPerPage } from "services/brandService";
import { Context } from "telegraf";
import { getPaginatedInlineKeyboard } from "utils/pagination";
import { CallbackQuery } from "@telegraf/types";
import { renderPaginatedModelButtons } from "constants/buttons/renderPaginatedButtons";
import { ERROR_MESSAGES } from "constants/messages";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { getAdvertisementDraft } from "services/advertismentDraft";
export const registerMarksPaginations = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const [, page] = (callbackQuery as CallbackQuery.DataQuery).data.split(":");
    const draft = await getAdvertisementDraft(ctx.from.id.toString());


    if (!draft || !draft.brandId) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_DRAFT, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const models = await getModelsPerPage(Number(page), draft.brandId);

    const keyboard = getPaginatedInlineKeyboard(
      models.models,
      renderPaginatedModelButtons,
      {
        buttonCallback: "page_models",
        totalItems: models.total,
        currentPage: Number(page),
        isLastPage: models.isLastPage,
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
