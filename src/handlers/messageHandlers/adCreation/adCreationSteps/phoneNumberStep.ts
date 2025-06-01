import { Message } from "@telegraf/types";
import { CLOSE_BUTTONS, SKIP_BUTTON, STEP_BACK_BUTTON } from "constants/buttons/buttons";
import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { STEPS_ENUM } from "constants/config";
import { updateAdvertisementDraft } from "services/advertismentDraft";
import { Context } from "telegraf";
import { parsePhoneNumber } from "utils/utils";
import { sendDraftMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";

export const handlePhoneNumberStep = async (
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

    const phoneNumber = parsePhoneNumber(text);

    if (!phoneNumber || !phoneNumber.startsWith("+7")) {
      return ctx.reply(ERROR_MESSAGES.ERROR_PHONE_NUMBER, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await updateAdvertisementDraft(ctx.from.id.toString(), {
      currentStep: STEPS_ENUM.AUTOTEKA_LINK,
      phoneNumber: phoneNumber,
    });

    await ctx.deleteMessage();

    if (isEdit) {
      return await sendDraftMessage(ctx);
    }

    return ctx.reply(CHOOSE_MESSAGES.AUTOTEKA_LINK, {
      reply_markup: {
        inline_keyboard: [
          ...SKIP_BUTTON(STEPS_ENUM.AUTOTEKA_LINK),
          ...STEP_BACK_BUTTON,
        ],
      },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
