import { Markup } from "telegraf";
import {
  InlineKeyboardButton,
  KeyboardButton,
} from "telegraf/typings/core/types/typegram";
import {
  IAdvertisement,
  IAdvertisementDraft,
  IBrand,
  ICarModel,
  IRegion,
} from "./db";
import { ADVERTISEMENT_MESSAGE } from "constants/messages";
import { getRegionsPerPage } from "services/regionService";
import { getPaginatedInlineKeyboard } from "./pagination";
import { getBrandsPerPage, getModelsPerPage } from "services/brandService";
import {
  renderPaginatedBrandButtons,
  renderPaginatedModelButtons,
  renderPaginatedRegionButtons,
} from "./pagination/renderPaginatedButtons";

export const getInlineKeyboard = (buttons: InlineKeyboardButton[]) => {
  return {
    reply_markup: {
      inline_keyboard: buttons,
    },
  };
};

export const getYearsPerPage = (page: number) => {
  const currentYear = new Date().getFullYear();
  const countedYear = currentYear - (page * 8 - 8);
  const years = Array.from({ length: 8 }, (_, i) => countedYear - i);

  return {
    years,
    total: 50,
    isLastPage: 50 <= page * 8,
  };
};

export const parseNumberWithAbbreviations = (input: string) => {
  const cleanInput = input.toLowerCase().replace(/\s+/g, "");

  let multiplier = 1;
  if (cleanInput.includes("млн")) {
    multiplier = 1000000;
  } else if (cleanInput.includes("тыс")) {
    multiplier = 1000;
  } else if (cleanInput.includes("к") || cleanInput.includes("k")) {
    multiplier = 1000;
  }

  let value = cleanInput
    .replace(/млн/g, "")
    .replace(/тыс/g, "")
    .replace(/[кk]/g, "");

  const dotCount = (value.match(/\./g) || []).length;
  const commaCount = (value.match(/,/g) || []).length;

  if (dotCount > 1) {
    value = value.replace(/\./g, "");
  } else if (dotCount === 1 && value.lastIndexOf(".") !== value.length - 2) {
    value = value.replace(/\./g, "");
  }

  if (commaCount === 1 && value.lastIndexOf(",") === value.length - 2) {
    value = value.replace(",", ".");
  }
  value = value.replace(/,/g, "");

  value = value.replace(/[^\d.]/g, "");

  const number = parseFloat(value);

  return isNaN(number) ? NaN : number * multiplier;
};

export const validateAdvertisementDraft = (draft: IAdvertisementDraft) => {
  if (
    !draft.brandId ||
    !draft.modelId ||
    !draft.year ||
    !draft.engineType ||
    !draft.driveType ||
    !draft.horsePower ||
    !draft.mileage ||
    !draft.price ||
    !draft.phoneNumber ||
    !draft.description ||
    !draft.photos
  ) {
    return false;
  }

  return true;
};
