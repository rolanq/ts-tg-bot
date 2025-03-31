import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { STEPS_ENUM } from "constants/config";
import { updateAdvertisementDraft } from "services/advertismentDraft";
import { Context } from "telegraf";
import { getFirstPageForEngineTypes } from "utils/pagination/getFirstPages";

export const yearStep = async (ctx: Context, selectedYear: string) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply("Произошла ошибка. Попробуйте позже.");
    }

    await updateAdvertisementDraft(ctx.from?.id.toString(), {
      year: Number(selectedYear),
      currentStep: STEPS_ENUM.ENGINETYPE,
    });

    const keyboard = getFirstPageForEngineTypes();

    await ctx.deleteMessage();

    return ctx.reply(CHOOSE_MESSAGES.ENGINE_TYPE, {
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
