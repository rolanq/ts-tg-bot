import {
  CLOSE_BUTTONS,
  EXISTING_ADVERTISEMENT_DRAFT_BUTTONS,
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
        return ctx.reply(ERROR_MESSAGES.ERROR, {
          reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
        });
      }

      await ctx.deleteMessage();

      const draft = await getAdvertisementDraft(ctx.from.id.toString());

      if (!draft) {
        return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_DRAFT, {
          reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
        });
      }

      const message = await renderAdvertismentMessage(draft, true);

      if (draft.photos?.length || draft.video) {
        const mediaGroup = [
          ...(draft.photos?.map((photo) => ({
            type: "photo" as const,
            media: photo,
          })) || []),
          ...(draft.video
            ? [
                {
                  type: "video" as const,
                  media: draft.video,
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

        return ctx.reply(MESSAGES.AD_READY, {
          reply_markup: {
            inline_keyboard: EXISTING_ADVERTISEMENT_DRAFT_BUTTONS,
          },
        });
      }

      await ctx.reply(message, {
        reply_markup: { inline_keyboard: EXISTING_ADVERTISEMENT_DRAFT_BUTTONS },
        parse_mode: "HTML",
      });
    } catch (error) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }
  });

  bot.action("delete_all_photos", async (ctx) => {
    try {
      await ctx.deleteMessage();

      await updateAdvertisementDraft(ctx.from.id.toString(), {
        photos: [],
      });

      await ctx.reply(MESSAGES.PHOTOS_DELETED, {
        reply_markup: {
          inline_keyboard: [
            ...FINISH_PHOTOS_BUTTONS(false),
            ...CLOSE_BUTTONS(),
          ],
        },
      });
    } catch (error) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }
  });
};
