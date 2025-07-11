import { ERROR_MESSAGES } from "constants/messages";
import { getAdvertisements } from "services/advertisment";
import { getSavedSearch } from "services/savedSearches";
import { Context } from "telegraf";
import { getAdvertismentWhereCondition } from "utils/utils";
import { renderAdsNotFoundMessage } from "./helpers";
import { renderAdvertismentMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";

export const handleSearch = async (ctx: Context) => {
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

    const whereCondition = getAdvertismentWhereCondition(savedSearch);

    const ads = await getAdvertisements(whereCondition);

    if (ads.length === 0) {
      return ctx.answerCbQuery(renderAdsNotFoundMessage(savedSearch), {
        show_alert: true,
      });
    }

    ads.forEach(async (ad) => {
      const message = await renderAdvertismentMessage(ad);

      if (ad.photos?.length || ad.video) {
        const mediaGroup = [
          ...(ad.photos?.map((photo) => ({
            type: "photo" as const,
            media: photo,
          })) || []),
          ...(ad.video
            ? [
                {
                  type: "video" as const,
                  media: ad.video,
                },
              ]
            : []),
        ];

        await ctx.sendMediaGroup(
          mediaGroup.map((media, i) => ({
            ...media,
            caption: i === 0 ? message : undefined,
            parse_mode: "HTML",
          }))
        );
      } else {
        await ctx.reply(message, { parse_mode: "HTML" });
      }
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
