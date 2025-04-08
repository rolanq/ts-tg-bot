import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { STEPS_ENUM } from "constants/config";
import { updateAdvertisementDraft } from "services/advertismentDraft";
import { getBrandById } from "services/brandService";
import { Context } from "telegraf";
import { getFirstPageForModels } from "utils/pagination/getFirstPages";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { sendDraftMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";

export const brandStep = async (
  ctx: Context,
  selectedBrandId: string,
  isEdit: boolean = false
) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const brand = await getBrandById(Number(selectedBrandId));

    if (!brand) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_BRAND, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await updateAdvertisementDraft(ctx.from?.id.toString(), {
      brandId: brand.id,
      currentStep: STEPS_ENUM.MODEL,
    });

    await ctx.deleteMessage();

    if (isEdit) {
      return await sendDraftMessage(ctx);
    }

    const keyboard = await getFirstPageForModels(brand.id);
    return ctx.reply(CHOOSE_MESSAGES.MODEL, {
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
