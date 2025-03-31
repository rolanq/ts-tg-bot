import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { STEPS_ENUM } from "constants/config";
import { updateAdvertisementDraft } from "services/advertismentDraft";
import { getBrandById } from "services/brandService";
import { Context } from "telegraf";
import { getFirstPageForModels } from "utils/pagination/getFirstPages";

export const brandStep = async (ctx: Context, selectedBrandId: string) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_BRANDS);
    }

    const brand = await getBrandById(Number(selectedBrandId));

    if (!brand) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_BRAND);
    }

    await updateAdvertisementDraft(ctx.from?.id.toString(), {
      brandId: brand.id,
      currentStep: STEPS_ENUM.MODEL,
    });

    const keyboard = await getFirstPageForModels(brand.id);

    await ctx.deleteMessage();

    return ctx.reply(CHOOSE_MESSAGES.MODEL, {
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
