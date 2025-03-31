import {
  InlineKeyboardButton,
  InputMediaPhoto,
} from "telegraf/typings/core/types/typegram";
import { IAdvertisement, IAdvertisementDraft, ISavedSearch } from "./db";
import { Op, WhereOptions } from "sequelize";
import { renderAdvertismentMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";
import { MediaGroup } from "telegraf/typings/telegram-types";

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

export const getAdvertismentWhereCondition = (savedSearch: ISavedSearch) => {
  const whereCondition: WhereOptions<IAdvertisement> = {
    isActive: true,
  };

  if (savedSearch.regionId) {
    whereCondition.regionId = savedSearch.regionId;
  }

  if (savedSearch.brandId) {
    whereCondition.brandId = savedSearch.brandId;
  }

  if (
    savedSearch.priceFrom !== undefined ||
    savedSearch.priceTo !== undefined
  ) {
    const priceConditions = [];

    if (savedSearch.priceFrom !== null) {
      priceConditions.push({ [Op.gte]: Number(savedSearch.priceFrom) });
    }

    if (savedSearch.priceTo !== null) {
      priceConditions.push({ [Op.lte]: Number(savedSearch.priceTo) });
    }

    if (priceConditions.length > 0) {
      whereCondition.price = { [Op.and]: priceConditions };
    }
  }

  return whereCondition;
};

export const formatAdvertisementMedia = async (
  ad: IAdvertisement
): Promise<{ text: string | null; media: InputMediaPhoto[] | null }> => {
  const message = await renderAdvertismentMessage(ad);

  if (!ad.photos || ad.photos.length === 0) {
    return { text: message, media: null };
  }

  const media: InputMediaPhoto[] = ad.photos.map((photo, index) => ({
    type: "photo",
    media: photo,
    caption: index === 0 ? message : undefined,
  }));

  return { text: null, media };
};
