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
export const handleAdCreationMessage = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      ctx.reply(ERROR_MESSAGES.ERROR);
      return;
    }

    const user = await getUser(ctx.from.id.toString());

    if (!user) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_USER);
    }

    const draft = await getAdvertisementDraft(ctx.from.id.toString());

    if (!draft) {
      ctx.reply(ERROR_MESSAGES.ERROR);
      await updateUser(ctx.from.id.toString(), {
        state: USER_STATE_ENUM.MENU,
      });
      return;
    }

    switch (draft.currentStep) {
      case STEPS_ENUM.HORSEPOWER:
        await handleHorsePowerStep(ctx);
        break;
      case STEPS_ENUM.MILEAGE:
        await handleMileAgeStep(ctx);
        break;
      case STEPS_ENUM.DESCRIPTION:
        await handleDescriptionStep(ctx);
        break;
      case STEPS_ENUM.PRICE:
        await handlePriceStep(ctx);
        break;
      case STEPS_ENUM.PHONENUMBER:
        await handlePhoneNumberStep(ctx);
        break;
    }
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
