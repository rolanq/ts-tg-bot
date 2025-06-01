import { Message } from "@telegraf/types";
import {
  CLOSE_BUTTONS,
  FINISH_PHOTOS_BUTTONS,
  SKIP_BUTTON,
  STEP_BACK_BUTTON,
} from "constants/buttons/buttons";
import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { STEPS_ENUM } from "constants/config";
import {
  getAdvertisementDraft,
  updateAdvertisementDraft,
} from "services/advertismentDraft";
import { Context } from "telegraf";
import { parseAutotekaLink } from "utils/utils";
import { sendDraftMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";

export const handleAutotekaLinkStep = async (
  ctx: Context,
  isEdit: boolean = false
) => {
  try {
    if (!ctx.from?.id || !ctx.message) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const draft = await getAdvertisementDraft(ctx.from.id.toString());

    if (!draft) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_DRAFT, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const text = (ctx.message as Message.TextMessage).text;

    const autotekaLink = parseAutotekaLink(text);

    if (!autotekaLink) {
      return ctx.reply(ERROR_MESSAGES.ERROR_AUTOTEKA_LINK, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await updateAdvertisementDraft(ctx.from.id.toString(), {
      currentStep: STEPS_ENUM.VIDEO,
      autotekaLink: autotekaLink,
    });

    await ctx.deleteMessage();

    if (isEdit) {
      return await sendDraftMessage(ctx);
    }

    return ctx.reply(CHOOSE_MESSAGES.VIDEO, {
      reply_markup: {
        inline_keyboard: [
          ...SKIP_BUTTON(STEPS_ENUM.VIDEO),
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
