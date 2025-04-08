import { CHOOSE_MESSAGES, ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { STEPS_ENUM, USER_STATE_ENUM } from "constants/config";
import {
  dropAdvertisementDraft,
  getAdvertisementDraft,
  updateAdvertisementDraft,
} from "services/advertismentDraft";
import { Context, Telegraf } from "telegraf";
import {
  getFirstPageForBrands,
  getFirstPageForDriveTypes,
  getFirstPageForEngineTypes,
  getFirstPageForModels,
  getFirstPageForRegions,
  getFirstPageForTransmissionTypes,
  getFirstPageForYears,
} from "utils/pagination/getFirstPages";
import { getKeyboardForStep } from "./helpers";
import {
  FINISH_PHOTOS_BUTTONS,
  CLOSE_BUTTONS,
  EDIT_AD_DRAFT_BUTTONS,
} from "constants/buttons/buttons";
import { CallbackQuery } from "@telegraf/types";
import { updateUser } from "services/User";

const adDraftContinue = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_DRAFT, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const draft = await getAdvertisementDraft(ctx.from?.id.toString());

    if (!draft) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_DRAFT, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const keyboard = await getKeyboardForStep(draft);

    await ctx.deleteMessage();

    switch (draft.currentStep) {
      case STEPS_ENUM.HORSEPOWER:
        return ctx.reply(CHOOSE_MESSAGES.HORSE_POWER);
      case STEPS_ENUM.MILEAGE:
        return ctx.reply(CHOOSE_MESSAGES.MILEAGE);
      case STEPS_ENUM.DESCRIPTION:
        return ctx.reply(CHOOSE_MESSAGES.DESCRIPTION);
      case STEPS_ENUM.PRICE:
        return ctx.reply(CHOOSE_MESSAGES.PRICE);
      case STEPS_ENUM.PHONENUMBER:
        return ctx.reply(CHOOSE_MESSAGES.PHONE_NUMBER);
      case STEPS_ENUM.PHOTOS:
        return ctx.reply(CHOOSE_MESSAGES.PHOTOS, {
          reply_markup: { inline_keyboard: FINISH_PHOTOS_BUTTONS },
        });
    }

    return ctx.reply(MESSAGES.CREATE_AD_CLICKED_FOR_DRAFT, {
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};

const adDraftNew = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_DRAFT, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await dropAdvertisementDraft(ctx.from?.id.toString());

    const keyboard = await getFirstPageForRegions();

    await ctx.deleteMessage();

    return ctx.reply(MESSAGES.CREATE_AD_CLICKED, {
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};

const adDraftEditField = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_DRAFT, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const [, field] = (callbackQuery as CallbackQuery.DataQuery).data.split(
      ":"
    );

    if (!field) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_DRAFT, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const draft = await getAdvertisementDraft(ctx.from?.id.toString());

    if (!draft) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_DRAFT, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await ctx.deleteMessage();
    console.log(field);

    switch (field as STEPS_ENUM) {
      case STEPS_ENUM.REGION:
        const keyboardRegions = await getFirstPageForRegions(true);
        return ctx.reply(CHOOSE_MESSAGES.REGION, {
          reply_markup: { inline_keyboard: keyboardRegions },
        });
      case STEPS_ENUM.YEAR:
        const keyboardYears = getFirstPageForYears(true);
        return ctx.reply(CHOOSE_MESSAGES.YEAR, {
          reply_markup: { inline_keyboard: keyboardYears },
        });
      case STEPS_ENUM.BRAND:
        const keyboardBrands = await getFirstPageForBrands(true);
        return ctx.reply(CHOOSE_MESSAGES.BRAND, {
          reply_markup: { inline_keyboard: keyboardBrands },
        });
      case STEPS_ENUM.MODEL:
        if (!draft.brandId) {
          return ctx.reply(ERROR_MESSAGES.ERROR_NEED_BRAND_ID, {
            reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
          });
        }
        const keyboardModels = await getFirstPageForModels(draft.brandId, true);
        return ctx.reply(CHOOSE_MESSAGES.MODEL, {
          reply_markup: { inline_keyboard: keyboardModels },
        });
      case STEPS_ENUM.ENGINETYPE:
        const keyboardEngineTypes = getFirstPageForEngineTypes(true);
        return ctx.reply(CHOOSE_MESSAGES.ENGINE_TYPE, {
          reply_markup: { inline_keyboard: keyboardEngineTypes },
        });
      case STEPS_ENUM.DRIVETYPE:
        const keyboardDriveTypes = getFirstPageForDriveTypes(true);
        console.log(keyboardDriveTypes);

        return ctx.reply(CHOOSE_MESSAGES.DRIVE_TYPE, {
          reply_markup: { inline_keyboard: keyboardDriveTypes },
        });
      case STEPS_ENUM.TRANSMISSIONTYPE:
        const keyboardTransmissions = getFirstPageForTransmissionTypes(true);
        return ctx.reply(CHOOSE_MESSAGES.TRANSMISSION, {
          reply_markup: { inline_keyboard: keyboardTransmissions },
        });

      case STEPS_ENUM.HORSEPOWER:
        await updateAdvertisementDraft(ctx.from?.id.toString(), {
          currentStep: STEPS_ENUM.HORSEPOWER_EDIT,
        });
        return ctx.reply(CHOOSE_MESSAGES.HORSE_POWER);
      case STEPS_ENUM.MILEAGE:
        await updateAdvertisementDraft(ctx.from?.id.toString(), {
          currentStep: STEPS_ENUM.MILEAGE_EDIT,
        });
        return ctx.reply(CHOOSE_MESSAGES.MILEAGE);
      case STEPS_ENUM.DESCRIPTION:
        await updateAdvertisementDraft(ctx.from?.id.toString(), {
          currentStep: STEPS_ENUM.DESCRIPTION_EDIT,
        });
        return ctx.reply(CHOOSE_MESSAGES.DESCRIPTION);
      case STEPS_ENUM.PRICE:
        await updateAdvertisementDraft(ctx.from?.id.toString(), {
          currentStep: STEPS_ENUM.PRICE_EDIT,
        });
        return ctx.reply(CHOOSE_MESSAGES.PRICE);
      case STEPS_ENUM.PHONENUMBER:
        await updateAdvertisementDraft(ctx.from?.id.toString(), {
          currentStep: STEPS_ENUM.PHONENUMBER_EDIT,
        });
        return ctx.reply(CHOOSE_MESSAGES.PHONE_NUMBER);
      case STEPS_ENUM.PHOTOS:
        await updateAdvertisementDraft(ctx.from?.id.toString(), {
          currentStep: STEPS_ENUM.PHOTOS_EDIT,
        });
        return ctx.reply(CHOOSE_MESSAGES.PHOTOS, {
          reply_markup: { inline_keyboard: FINISH_PHOTOS_BUTTONS },
        });
    }
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};

const adDraftEdit = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_DRAFT, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await updateUser(ctx.from?.id.toString(), {
      state: USER_STATE_ENUM.AD_CREATION,
    });

    await ctx.deleteMessage();

    return ctx.reply(MESSAGES.EDIT_AD_DRAFT, {
      reply_markup: { inline_keyboard: EDIT_AD_DRAFT_BUTTONS },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
export const registerAdDraftCallbacks = (bot: Telegraf) => {
  bot.action("continue_ad_draft", adDraftContinue);
  bot.action("new_ad_draft", adDraftNew);
  bot.action("edit_ad_draft", adDraftEdit);
  bot.action(/edit_field_draft:/, adDraftEditField);
};
