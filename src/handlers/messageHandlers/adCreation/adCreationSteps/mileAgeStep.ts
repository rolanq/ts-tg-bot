import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { RESTRICTIONS, STEPS_ENUM } from "constants/config";
import { updateAdvertisementDraft } from "services/advertismentDraft";
import { Context } from "telegraf";
import { Message } from "@telegraf/types";
import { parseNumberWithAbbreviations } from "utils/utils";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { sendDraftMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";

export const handleMileAgeStep = async (
  ctx: Context,
  isEdit: boolean = false
) => {
  try {
    if (!ctx.from?.id || !ctx.message) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const text = (ctx.message as Message.TextMessage).text;

    const mileage = parseNumberWithAbbreviations(text);

    if (
      mileage >= RESTRICTIONS.MILEAGE.MAX ||
      mileage <= RESTRICTIONS.MILEAGE.MIN
    ) {
      return ctx.reply(ERROR_MESSAGES.ERROR_MILEAGE, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await updateAdvertisementDraft(ctx.from.id.toString(), {
      currentStep: STEPS_ENUM.DESCRIPTION,
      mileage: mileage,
    });

    await ctx.deleteMessage();

    if (isEdit) {
      return await sendDraftMessage(ctx);
    }

    return ctx.reply(CHOOSE_MESSAGES.DESCRIPTION);
  } catch (error) {
    console.log(error);

    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
