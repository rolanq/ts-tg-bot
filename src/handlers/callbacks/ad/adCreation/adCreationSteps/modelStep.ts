import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { STEPS_ENUM } from "constants/config";
import { updateAdvertisementDraft } from "services/advertismentDraft";
import { getFirstPageForYears } from "utils/pagination/getFirstPages";
import { Context } from "telegraf";
import { getCarModelById } from "services/brandService";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { sendDraftMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";

export const modelStep = async (
  ctx: Context,
  selectedModelId: string,
  isEdit: boolean = false
) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const model = await getCarModelById(Number(selectedModelId));

    if (!model) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_MODEL, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await updateAdvertisementDraft(ctx.from?.id.toString(), {
      modelId: model.id,
      currentStep: STEPS_ENUM.YEAR,
    });

    await ctx.deleteMessage();

    if (isEdit) {
      return await sendDraftMessage(ctx);
    }

    const keyboard = getFirstPageForYears();
    return ctx.reply(CHOOSE_MESSAGES.YEAR, {
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
