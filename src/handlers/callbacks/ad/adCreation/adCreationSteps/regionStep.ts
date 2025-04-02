import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { STEPS_ENUM } from "constants/config";
import { updateAdvertisementDraft } from "services/advertismentDraft";
import { getRegionById } from "services/regionService";
import { Context } from "telegraf";
import { getFirstPageForBrands } from "utils/pagination/getFirstPages";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";

export const regionStep = async (ctx: Context, selectedRegionId: string) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const region = await getRegionById(Number(selectedRegionId));

    if (!region) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_REGION, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await updateAdvertisementDraft(ctx.from?.id.toString(), {
      regionId: region.id,
      currentStep: STEPS_ENUM.BRAND,
    });

    const keyboard = await getFirstPageForBrands();

    await ctx.deleteMessage();

    return ctx.reply(CHOOSE_MESSAGES.BRAND, {
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
