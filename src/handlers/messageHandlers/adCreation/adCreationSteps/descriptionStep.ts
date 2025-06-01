import { Message } from "@telegraf/types";
import { CLOSE_BUTTONS, STEP_BACK_BUTTON } from "constants/buttons/buttons";
import { STEPS_ENUM } from "constants/config";
import { CHOOSE_MESSAGES, ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { sendDraftMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";
import { updateAdvertisementDraft } from "services/advertismentDraft";
import { Context } from "telegraf";
import { checkBadWords } from "utils/utils";

export const handleDescriptionStep = async (
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

    if (checkBadWords(text)) {
      return ctx.reply(ERROR_MESSAGES.ERROR_BAD_WORDS, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await updateAdvertisementDraft(ctx.from.id.toString(), {
      currentStep: STEPS_ENUM.PRICE,
      description: text,
    });

    await ctx.deleteMessage();

    if (isEdit) {
      return await sendDraftMessage(ctx);
    }

    return ctx.reply(CHOOSE_MESSAGES.PRICE, {
      reply_markup: { inline_keyboard: STEP_BACK_BUTTON },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
