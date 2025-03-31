import { InlineKeyboardButton } from "@telegraf/types";
import {
  getFirstPageForBrands,
  getFirstPageForDriveTypes,
  getFirstPageForEngineTypes,
  getFirstPageForModels,
  getFirstPageForTransmissionTypes,
  getFirstPageForYears,
} from "utils/pagination/getFirstPages";
import { STEPS_ENUM } from "constants/config";
import { getFirstPageForRegions } from "utils/pagination/getFirstPages";
import { IAdvertisementDraft } from "utils/db";

export const getKeyboardForStep = async (draft: IAdvertisementDraft) => {
  try {
    let keyboard: InlineKeyboardButton[][] = [];

    switch (draft?.currentStep) {
      case STEPS_ENUM.REGION:
        keyboard = await getFirstPageForRegions();
        break;
      case STEPS_ENUM.BRAND:
        keyboard = await getFirstPageForBrands();
        break;
      case STEPS_ENUM.MODEL:
        if (draft.brandId) {
          keyboard = await getFirstPageForModels(draft.brandId);
        }
        break;
      case STEPS_ENUM.YEAR:
        keyboard = getFirstPageForYears();
        break;
      case STEPS_ENUM.ENGINETYPE:
        keyboard = getFirstPageForEngineTypes();
        break;
      case STEPS_ENUM.DRIVETYPE:
        keyboard = getFirstPageForDriveTypes();
        break;
      case STEPS_ENUM.TRANSMISSIONTYPE:
        keyboard = getFirstPageForTransmissionTypes();
        break;
      default:
        break;
    }

    return keyboard;
  } catch (error) {
    return [];
  }
};
