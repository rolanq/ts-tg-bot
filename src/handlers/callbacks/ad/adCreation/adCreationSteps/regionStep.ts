import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { STEPS_ENUM } from "constants/config";
import { updateAdvertisementDraft } from "services/advertismentDraft";
import { getRegionById } from "services/regionService";
import { Context } from "telegraf";
import { getFirstPageForBrands } from "utils/pagination/getFirstPages";
import { CLOSE_BUTTONS, STEP_BACK_BUTTON } from "constants/buttons/buttons";
import { handleCreateAd } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/handleCreateAd";
import { sendDraftMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";

export const regionStep = async (
  ctx: Context,
  selectedRegionId: string,
  isEdit: boolean = false
) => {
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

    await ctx.deleteMessage();

    if (isEdit) {
      return await sendDraftMessage(ctx);
    }

    const keyboard = await getFirstPageForBrands();
    return ctx.reply(CHOOSE_MESSAGES.BRAND, {
      reply_markup: { inline_keyboard: [...keyboard, ...STEP_BACK_BUTTON] },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
