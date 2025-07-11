import { Message } from "@telegraf/types";
import { CHOOSE_MESSAGES, ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { RESTRICTIONS, STEPS_ENUM } from "constants/config";
import {
  getAdvertisementDraft,
  updateAdvertisementDraft,
} from "services/advertismentDraft";
import { Context } from "telegraf";
import { parseNumberWithAbbreviations } from "utils/utils";
import { CLOSE_BUTTONS, STEP_BACK_BUTTON } from "constants/buttons/buttons";
import { sendDraftMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";

export const handleHorsePowerStep = async (ctx: Context, isEdit: boolean = false) => {
  try {
    if (!ctx.from?.id || !ctx.message) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const text = (ctx.message as Message.TextMessage).text;

    const horsePower = parseNumberWithAbbreviations(text);

    if (isNaN(horsePower)) {
      return ctx.reply(ERROR_MESSAGES.ERROR_CANT_PARSE_NUMBER, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    if (
      horsePower >= RESTRICTIONS.HORSEPOWER.MAX ||
      horsePower <= RESTRICTIONS.HORSEPOWER.MIN
    ) {
      return ctx.reply(ERROR_MESSAGES.ERROR_HORSE_POWER, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await updateAdvertisementDraft(ctx.from.id.toString(), {
      currentStep: STEPS_ENUM.MILEAGE,
      horsePower: horsePower,
    });

    await ctx.deleteMessage();

    if (isEdit) {
      return await sendDraftMessage(ctx);
    }

    return ctx.reply(CHOOSE_MESSAGES.MILEAGE, {
      reply_markup: { inline_keyboard: STEP_BACK_BUTTON },
    });
  } catch (error) {
    console.log(error);

    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
