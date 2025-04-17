import { CallbackQuery } from "@telegraf/types";
import {
  CLOSE_BUTTONS,
  FINISH_PHOTOS_BUTTONS,
} from "constants/buttons/buttons";
import { STEPS_ENUM } from "constants/config";
import { CHOOSE_MESSAGES, ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { updateAdvertisementDraft } from "services/advertismentDraft";
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

      if (skipData === STEPS_ENUM.AUTOTEKA_LINK) {
        await updateAdvertisementDraft(ctx.from?.id.toString(), {
          currentStep: STEPS_ENUM.PHOTOS,
        });

        return ctx.reply(CHOOSE_MESSAGES.PHOTOS, {
          reply_markup: { inline_keyboard: FINISH_PHOTOS_BUTTONS },
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
};
