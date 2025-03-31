import { ERROR_MESSAGES } from "constants/messages";
import { getAdvertisements } from "services/advertisment";
import { getSavedSearch } from "services/savedSearches";
import { Context } from "telegraf";
import { getAdvertismentWhereCondition } from "utils/utils";
import { renderAdsNotFoundMessage } from "./helpers";
import { renderAdvertismentMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";

export const handleSearch = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR);
    }

    const savedSearch = await getSavedSearch(ctx.from.id.toString());

    if (!savedSearch) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_SAVED_SEARCH);
    }

    const whereCondition = getAdvertismentWhereCondition(savedSearch);

    const ads = await getAdvertisements(whereCondition);

    if (ads.length === 0) {
      return ctx.answerCbQuery(renderAdsNotFoundMessage(savedSearch), {
        show_alert: true,
      });
    }

    ads.forEach(async (ad) => {
      const message = await renderAdvertismentMessage(ad);

      if (ad.photos.length) {
        await ctx.sendMediaGroup(
          ad.photos.map((photo, i) => ({
            type: "photo",
            media: photo,
            caption: i === 0 ? message : undefined,
          }))
        );
      } else {
        await ctx.reply(message);
      }
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
