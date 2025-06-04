import {
  CLOSE_BUTTONS,
  DELETE_AUTOTEKA_LINK_BUTTON,
  FINISH_PHOTOS_BUTTONS,
  SKIP_BUTTON,
  STEP_BACK_BUTTON,
} from "constants/buttons/buttons";
import { STEPS_ENUM } from "constants/config";
import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import {
  getAdvertisementDraft,
  updateAdvertisementDraft,
} from "services/advertismentDraft";
import { Context } from "telegraf";
import {
  getFirstPageForRegions,
  getFirstPageForYears,
  getFirstPageForBrands,
  getFirstPageForModels,
  getFirstPageForEngineTypes,
  getFirstPageForDriveTypes,
  getFirstPageForTransmissionTypes,
} from "utils/pagination/getFirstPages";
import { getStepBack } from "utils/utils";

export const handleStepBack = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
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

    if (!draft.currentStep) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_STEP, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const stepBack = getStepBack(draft.currentStep);

    if (!stepBack) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_STEP, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await updateAdvertisementDraft(ctx.from.id.toString(), {
      currentStep: stepBack,
    });

    await ctx.deleteMessage();

    switch (stepBack) {
      case STEPS_ENUM.REGION:
        const keyboardRegions = await getFirstPageForRegions();
        return ctx.reply(CHOOSE_MESSAGES.REGION, {
          reply_markup: { inline_keyboard: keyboardRegions },
        });
      case STEPS_ENUM.YEAR:
        const keyboardYears = getFirstPageForYears();
        return ctx.reply(CHOOSE_MESSAGES.YEAR, {
          reply_markup: {
            inline_keyboard: [...keyboardYears, ...STEP_BACK_BUTTON],
          },
        });
      case STEPS_ENUM.BRAND:
        const keyboardBrands = await getFirstPageForBrands();
        return ctx.reply(CHOOSE_MESSAGES.BRAND, {
          reply_markup: {
            inline_keyboard: [...keyboardBrands, ...STEP_BACK_BUTTON],
          },
        });
      case STEPS_ENUM.MODEL:
        if (!draft.brandId) {
          return ctx.reply(ERROR_MESSAGES.ERROR_NEED_BRAND_ID, {
            reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
          });
        }
        const keyboardModels = await getFirstPageForModels(draft.brandId);
        return ctx.reply(CHOOSE_MESSAGES.MODEL, {
          reply_markup: {
            inline_keyboard: [...keyboardModels, ...STEP_BACK_BUTTON],
          },
        });
      case STEPS_ENUM.ENGINETYPE:
        const keyboardEngineTypes = getFirstPageForEngineTypes();
        return ctx.reply(CHOOSE_MESSAGES.ENGINE_TYPE, {
          reply_markup: {
            inline_keyboard: [...keyboardEngineTypes, ...STEP_BACK_BUTTON],
          },
        });
      case STEPS_ENUM.DRIVETYPE:
        const keyboardDriveTypes = getFirstPageForDriveTypes();
        return ctx.reply(CHOOSE_MESSAGES.DRIVE_TYPE, {
          reply_markup: {
            inline_keyboard: [...keyboardDriveTypes, ...STEP_BACK_BUTTON],
          },
        });
      case STEPS_ENUM.TRANSMISSIONTYPE:
        const keyboardTransmissions = getFirstPageForTransmissionTypes();
        return ctx.reply(CHOOSE_MESSAGES.TRANSMISSION, {
          reply_markup: {
            inline_keyboard: [...keyboardTransmissions, ...STEP_BACK_BUTTON],
          },
        });

      case STEPS_ENUM.HORSEPOWER:
        return ctx.reply(CHOOSE_MESSAGES.HORSE_POWER, {
          reply_markup: { inline_keyboard: STEP_BACK_BUTTON },
        });
      case STEPS_ENUM.MILEAGE:
        return ctx.reply(CHOOSE_MESSAGES.MILEAGE, {
          reply_markup: { inline_keyboard: STEP_BACK_BUTTON },
        });
      case STEPS_ENUM.DESCRIPTION:
        return ctx.reply(CHOOSE_MESSAGES.DESCRIPTION, {
          reply_markup: { inline_keyboard: STEP_BACK_BUTTON },
        });
      case STEPS_ENUM.PRICE:
        return ctx.reply(CHOOSE_MESSAGES.PRICE, {
          reply_markup: { inline_keyboard: STEP_BACK_BUTTON },
        });
      case STEPS_ENUM.PHONENUMBER:
        return ctx.reply(CHOOSE_MESSAGES.PHONE_NUMBER, {
          reply_markup: { inline_keyboard: STEP_BACK_BUTTON },
        });
      case STEPS_ENUM.AUTOTEKA_LINK:
        const autotekaLinkKeyboard = [...SKIP_BUTTON(STEPS_ENUM.AUTOTEKA_LINK)];
        if (draft.autotekaLink) {
          autotekaLinkKeyboard.push(...DELETE_AUTOTEKA_LINK_BUTTON);
        }
        autotekaLinkKeyboard.push(...STEP_BACK_BUTTON);
        return ctx.reply(CHOOSE_MESSAGES.AUTOTEKA_LINK_EDIT, {
          reply_markup: {
            inline_keyboard: autotekaLinkKeyboard,
          },
        });
      case STEPS_ENUM.VIDEO:
        return ctx.reply(CHOOSE_MESSAGES.VIDEO, {
          reply_markup: {
            inline_keyboard: [
              ...SKIP_BUTTON(STEPS_ENUM.VIDEO),
              ...STEP_BACK_BUTTON,
            ],
          },
        });
    }
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
