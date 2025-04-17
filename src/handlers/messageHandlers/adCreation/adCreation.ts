import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { STEPS_ENUM, USER_STATE_ENUM } from "constants/config";
import { getAdvertisementDraft } from "services/advertismentDraft";
import { getUser, updateUser } from "services/User";
import { Context } from "telegraf";
import { handleHorsePowerStep } from "./adCreationSteps/horsePowerStep";
import { handleMileAgeStep } from "./adCreationSteps/mileAgeStep";
import { handleDescriptionStep } from "./adCreationSteps/descriptionStep";
import { handlePriceStep } from "./adCreationSteps/priceStep";
import { handlePhoneNumberStep } from "./adCreationSteps/phoneNumberStep";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { handleAutotekaLinkStep } from "./adCreationSteps/autotekaStep";

export const handleAdCreationMessage = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const user = await getUser(ctx.from.id.toString());

    if (!user) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_USER, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const draft = await getAdvertisementDraft(ctx.from.id.toString());

    if (!draft) {
      await updateUser(ctx.from.id.toString(), {
        state: USER_STATE_ENUM.MENU,
      });

      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    switch (draft.currentStep) {
      case STEPS_ENUM.HORSEPOWER:
        await handleHorsePowerStep(ctx, false);
        break;
      case STEPS_ENUM.HORSEPOWER_EDIT:
        await handleHorsePowerStep(ctx, true);
        break;
      case STEPS_ENUM.MILEAGE:
        await handleMileAgeStep(ctx, false);
        break;
      case STEPS_ENUM.MILEAGE_EDIT:
        await handleMileAgeStep(ctx, true);
        break;
      case STEPS_ENUM.DESCRIPTION:
        await handleDescriptionStep(ctx, false);
        break;
      case STEPS_ENUM.DESCRIPTION_EDIT:
        await handleDescriptionStep(ctx, true);
        break;
      case STEPS_ENUM.PRICE:
        await handlePriceStep(ctx, false);
        break;
      case STEPS_ENUM.PRICE_EDIT:
        await handlePriceStep(ctx, true);
        break;
      case STEPS_ENUM.PHONENUMBER:
        await handlePhoneNumberStep(ctx, false);
        break;
      case STEPS_ENUM.PHONENUMBER_EDIT:
        await handlePhoneNumberStep(ctx, true);
        break;
      case STEPS_ENUM.AUTOTEKA_LINK:
        await handleAutotekaLinkStep(ctx, false);
        break;
      case STEPS_ENUM.AUTOTEKA_LINK_EDIT:
        await handleAutotekaLinkStep(ctx, true);
        break;
    }
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
