import { CallbackQuery } from "@telegraf/types";
import {
  CLOSE_BUTTONS,
  FINISH_PHOTOS_BUTTONS,
  SKIP_BUTTON,
  STEP_BACK_BUTTON,
} from "constants/buttons/buttons";
import { STEPS_ENUM } from "constants/config";
import { CHOOSE_MESSAGES, ERROR_MESSAGES, MESSAGES } from "constants/messages";
import {
  getAdvertisementDraft,
  updateAdvertisementDraft,
} from "services/advertismentDraft";
import { Telegraf } from "telegraf";

export const registerCommonCallbacks = (bot: Telegraf) => {
  bot.action(/^close_message/, async (ctx) => {
    try {
      const { callbackQuery } = ctx;

      if (!callbackQuery) {
        return;
      }
      const data = (callbackQuery as CallbackQuery.DataQuery).data;
      const [, messageId] = data.split(":");

      if (messageId) {
        await ctx.deleteMessage(Number(messageId));
      }
      await ctx.deleteMessage();
    } catch (error) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }
  });

  bot.action(/^skip:/, async (ctx) => {
    try {
      const { callbackQuery } = ctx;

      if (!callbackQuery) {
        return;
      }
      const data = (callbackQuery as CallbackQuery.DataQuery).data;
      const [, skipData] = data.split(":");

      const draft = await getAdvertisementDraft(ctx.from.id.toString());

      if (!draft) {
        return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_DRAFT, {
          reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
        });
      }

      if (skipData === STEPS_ENUM.AUTOTEKA_LINK) {
        await updateAdvertisementDraft(ctx.from.id.toString(), {
          currentStep: STEPS_ENUM.VIDEO,
        });

        return ctx.reply(CHOOSE_MESSAGES.VIDEO, {
          reply_markup: {
            inline_keyboard: [
              ...SKIP_BUTTON(STEPS_ENUM.VIDEO),
              ...STEP_BACK_BUTTON,
            ],
          },
        });
      } else if (skipData === STEPS_ENUM.VIDEO) {
        await updateAdvertisementDraft(ctx.from.id.toString(), {
          currentStep: STEPS_ENUM.PHOTOS,
        });

        return ctx.reply(CHOOSE_MESSAGES.PHOTOS, {
          reply_markup: {
            inline_keyboard: [
              ...FINISH_PHOTOS_BUTTONS(draft.photos?.length > 0),
              ...STEP_BACK_BUTTON,
            ],
          },
        });
      }
    } catch (error) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }
  });

  bot.action(/^delete_autoteka_link/, async (ctx) => {
    await updateAdvertisementDraft(ctx.from?.id.toString(), {
      autotekaLink: null,
    });

    return ctx.reply(MESSAGES.DELETE_AUTOTEKA_LINK, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  });

  bot.action(/^delete_video/, async (ctx) => {
    await updateAdvertisementDraft(ctx.from?.id.toString(), {
      video: null,
    });

    return ctx.reply(MESSAGES.DELETE_VIDEO, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  });
};
