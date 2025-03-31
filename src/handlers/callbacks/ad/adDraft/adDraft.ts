import { CHOOSE_MESSAGES, ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { STEPS_ENUM } from "constants/config";
import {
  dropAdvertisementDraft,
  getAdvertisementDraft,
  updateAdvertisementDraft,
} from "services/advertismentDraft";
import { Context, Telegraf } from "telegraf";
import {
  getFirstPageForRegions,
} from "utils/pagination/getFirstPages";
import { getKeyboardForStep } from "./helpers";
import { FINISH_PHOTOS_BUTTONS } from "constants/buttons/buttons";

const adDraftContinue = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_DRAFT);
    }

    const draft = await getAdvertisementDraft(ctx.from?.id.toString());

    if (!draft) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_DRAFT);
    }

    const keyboard = await getKeyboardForStep(draft);

    await ctx.deleteMessage();

    switch (draft.currentStep) {
      case STEPS_ENUM.HORSEPOWER:
        return ctx.reply(CHOOSE_MESSAGES.HORSE_POWER);
      case STEPS_ENUM.MILEAGE:
        return ctx.reply(CHOOSE_MESSAGES.MILEAGE);
      case STEPS_ENUM.DESCRIPTION:
        return ctx.reply(CHOOSE_MESSAGES.DESCRIPTION);
      case STEPS_ENUM.PRICE:
        return ctx.reply(CHOOSE_MESSAGES.PRICE);
      case STEPS_ENUM.PHONENUMBER:
        return ctx.reply(CHOOSE_MESSAGES.PHONE_NUMBER);
      case STEPS_ENUM.PHOTOS:
        return ctx.reply(CHOOSE_MESSAGES.PHOTOS, {
          reply_markup: { inline_keyboard: FINISH_PHOTOS_BUTTONS },
        });
    }

    return ctx.reply(MESSAGES.CREATE_AD_CLICKED_FOR_DRAFT, {
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};

const adDraftNew = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_DRAFT);
    }

    await dropAdvertisementDraft(ctx.from?.id.toString());

    const keyboard = await getFirstPageForRegions();

    await ctx.deleteMessage();

    return ctx.reply(MESSAGES.CREATE_AD_CLICKED, {
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};

export const registerAdDraftCallbacks = (bot: Telegraf) => {
  bot.action("continue_ad_draft", adDraftContinue);
  bot.action("new_ad_draft", adDraftNew);
};
