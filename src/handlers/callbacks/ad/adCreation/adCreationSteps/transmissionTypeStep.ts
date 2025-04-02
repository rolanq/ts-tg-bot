import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { STEPS_ENUM } from "constants/config";
import { updateAdvertisementDraft } from "services/advertismentDraft";
import { Context } from "telegraf";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";

export const transmissionTypeStep = async (
  ctx: Context,
  selectedTransmissionType: string
) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await updateAdvertisementDraft(ctx.from?.id.toString(), {
      transmission: selectedTransmissionType,
      currentStep: STEPS_ENUM.HORSEPOWER,
    });

    await ctx.deleteMessage();

    return ctx.reply(CHOOSE_MESSAGES.HORSE_POWER);
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
