import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { getSavedSearch } from "services/savedSearches";
import { Context } from "telegraf";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { createNotification } from "services/notification";

export const handleSaveSearch = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const savedSearch = await getSavedSearch(ctx.from.id.toString());

    if (!savedSearch) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_SAVED_SEARCH, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    if (
      savedSearch.brandId ||
      savedSearch.regionId ||
      savedSearch.priceFrom ||
      savedSearch.priceTo
    ) {
      const notification = await createNotification({
        brandId: savedSearch.brandId,
        regionId: savedSearch.regionId,
        priceFrom: savedSearch.priceFrom,
        priceTo: savedSearch.priceTo,
        userId: ctx.from.id.toString(),
      });

      if (notification) {
        return ctx.answerCbQuery(MESSAGES.NOTIFICATION_CREATED, {
          show_alert: true,
        });
      }
    } else {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_SAVING_SEARCH, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
