import {
  AD_PUBLISH_BUTTONS,
  FINISH_PHOTOS_BUTTONS,
} from "constants/buttons/buttons";
import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { renderAdvertismentMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";
import {
  getAdvertisementDraft,
  updateAdvertisementDraft,
} from "services/advertismentDraft";
import { Telegraf } from "telegraf";

export const registerPhotosCallbacks = (bot: Telegraf) => {
  bot.action("done_photos", async (ctx) => {
    try {
      if (!ctx.from?.id) {
        return ctx.reply(ERROR_MESSAGES.ERROR);
      }

      await ctx.deleteMessage();

      const draft = await getAdvertisementDraft(ctx.from.id.toString());

      if (!draft) {
        return ctx.reply(ERROR_MESSAGES.ERROR);
      }

      const message = await renderAdvertismentMessage(draft);

      if (draft.photos?.length) {
        await ctx.sendMediaGroup(
          draft.photos.map((photo, i) => ({
            type: "photo",
            media: photo,
            caption: i === 0 ? message : undefined,
          }))
        );

        return ctx.reply(MESSAGES.AD_READY, {
          reply_markup: { inline_keyboard: AD_PUBLISH_BUTTONS },
        });
      }

      await ctx.reply(message, {
        reply_markup: { inline_keyboard: AD_PUBLISH_BUTTONS },
      });
    } catch (error) {
      console.log(error);

      return ctx.reply(ERROR_MESSAGES.ERROR);
    }
  });

  bot.action("delete_all_photos", async (ctx) => {
    try {
      await ctx.deleteMessage();

      await updateAdvertisementDraft(ctx.from.id.toString(), {
        photos: [],
      });

      await ctx.deleteMessage();

      await ctx.reply(MESSAGES.PHOTOS_DELETED, {
        reply_markup: { inline_keyboard: FINISH_PHOTOS_BUTTONS },
      });
    } catch (error) {
      return ctx.reply(ERROR_MESSAGES.ERROR);
    }
  });
};
