import {
  InlineKeyboardButton,
  InputMediaPhoto,
} from "telegraf/typings/core/types/typegram";
import { IAdvertisement, IAdvertisementDraft, ISavedSearch, IUser } from "./db";
import { Op, WhereOptions } from "sequelize";
import { renderAdvertismentMessage } from "handlers/keyboardButtonHandlers/mainKeybardButtonHandler/helpers";
import { MediaGroup } from "telegraf/typings/telegram-types";
import { BAD_WORDS } from "constants/config";
import { getAdvertisementById } from "services/advertisment";
import { getUserById, getUserByIdOrUsername } from "services/User";

export const getInlineKeyboard = (buttons: InlineKeyboardButton[]) => {
  return {
    reply_markup: {
      inline_keyboard: buttons,
    },
  };
};

export const getYearsPerPage = (page: number) => {
  const currentYear = new Date().getFullYear();
  const countedYear = currentYear - (page * 15 - 15);
  const years = Array.from({ length: 15 }, (_, i) => countedYear - i);

  return {
    years,
    total: 50,
    isLastPage: 50 <= page * 15,
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
    parse_mode: "HTML",
  }));

  return { text: null, media };
};

export const checkBadWords = (text: string) => {
  const badWords = BAD_WORDS;
  const textLower = text.toLowerCase();
  return badWords.some((word) => textLower.includes(word));
};

export const parsePhoneNumber = (phoneNumber: string) => {
  const cleaned = phoneNumber.replace(/\s+/g, "");
  const match = cleaned.match(/^(\+?7|8)(\d{10})$/);
  if (!match) {
    return null;
  }

  return `+7${match[2]}`;
};

export const parseAutotekaLink = (link: string) => {
  const cleaned = link.replace(/\s+/g, "");

  const match = cleaned.match(/^https?:\/\/(www\.)?autoteka\.ru/);
  if (!match) {
    return null;
  }

  return cleaned;
};

export const searchUser = async (
  search: string
): Promise<{ user?: IUser; byAd: boolean } | undefined> => {
  try {
    const ad = await getAdvertisementById(search);

    if (ad) {
      return { user: await getUserById(ad.userId), byAd: true };
    }

    return undefined;
  } catch (error) {
    return { user: await getUserByIdOrUsername(search), byAd: false };
  }
};

export const generateRandomId = () => {
  return Math.floor(Math.random() * (2147483640 - 10000000 + 1) + 10000000);
};
