import {
  ADVERTISEMENT_MESSAGE,
  ADVERTISEMENT_MESSAGE_DRAFT,
  MESSAGES,
} from "constants/messages";
import { getBrandById, getCarModelById } from "services/brandService";
import { getRegionById } from "services/regionService";

import { IAdvertisement, IAdvertisementDraft } from "utils/db";

export const renderAdvertismentMessage = async (
  ad: IAdvertisement | IAdvertisementDraft,
  isDraft: boolean = false
) => {
  try {
    const tempAd = {
      brandName: "",
      carModelName: "",
      regionName: "",
      adStatus: "",

      adYear: ad.year ? ad.year.toString() : "Не указано",

      adEngineType: ad.engineType || "Не указано",
      adHorsePower: ad.horsePower ? ad.horsePower.toString() : "Не указано",
      adDriveType: ad.driveType || "Не указано",
      adTransmission: ad.transmission || "Не указано",
      adMileage: ad.mileage ? ad.mileage.toString() : "Не указано",
      adDescription: ad.description || "Не указано",
      adPrice: ad.price ? ad.price.toString() : "Не указано",
      adPhoneNumber: ad.phoneNumber || "Не указано",
      adTelegramUsername: ad.telegramUsername || "Не указано",
      adPhotosCount: ad.photos?.length || 0,
    };

    if ("isOnHold" in ad) {
      tempAd.adStatus = ad.isOnHold ? "[ПОД ЗАДАТКОМ]" : "";
    }

    if (ad.brandId) {
      const brand = await getBrandById(ad.brandId);
      tempAd.brandName = brand?.name || "Имя бренда не найдено";
    } else {
      tempAd.brandName = "Бренд не выбран";
    }

    if (ad.modelId) {
      const carModel = await getCarModelById(ad.modelId);
      tempAd.carModelName = carModel?.name || "Имя модели не найдено";
    } else {
      tempAd.carModelName = "Модель не выбрана";
    }

    if (ad.regionId) {
      const region = await getRegionById(ad.regionId);
      tempAd.regionName = region?.name || "Имя региона не найдено";
    } else {
      tempAd.regionName = "Регион не выбран";
    }

    return (isDraft ? ADVERTISEMENT_MESSAGE_DRAFT : ADVERTISEMENT_MESSAGE)
      .replace(/{brandName}/g, tempAd.brandName)
      .replace(/{carModel}/g, tempAd.carModelName)
      .replace(/{year}/g, tempAd.adYear)
      .replace(/{status}/g, tempAd.adStatus)
      .replace(/{region}/g, tempAd.regionName)
      .replace(/{engineType}/g, tempAd.adEngineType)
      .replace(/{horsePower}/g, tempAd.adHorsePower)
      .replace(/{driveType}/g, tempAd.adDriveType)
      .replace(/{transmission}/g, tempAd.adTransmission)
      .replace(/{mileage}/g, tempAd.adMileage)
      .replace(/{description}/g, tempAd.adDescription)
      .replace(/{price}/g, tempAd.adPrice)
      .replace(/{status}/g, tempAd.adStatus)
      .replace(/{telegramUsername}/g, tempAd.adTelegramUsername)
      .replace(/{photosCount}/g, tempAd.adPhotosCount.toString())
      .replace(/{phoneNumber}/g, tempAd.adPhoneNumber);
  } catch (error) {
    return "";
  }
};

export const renderAdvertisementDraftMessage = async (
  ad: IAdvertisementDraft
) => {
  try {
    const tempAd = await renderAdvertismentMessage(ad, true);

    return MESSAGES.CREATE_AD_CLICKED_DRAFT_EXIST.replace(
      /{advertisement}/g,
      tempAd
    );
  } catch (error) {
    return "";
  }
};
