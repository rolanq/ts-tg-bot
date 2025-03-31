import { ERROR_MESSAGES, SAVED_SEARCH_PARAMETERS } from "constants/messages";
import { ISavedSearch } from "utils/db";

export const renderAdsNotFoundMessage = (savedSearch: ISavedSearch) => {
  let message = "";

  if (savedSearch.brandId) {
    message += `Марка: ${savedSearch.brandId}\n`;
  }
  if (savedSearch.regionId) {
    message += `Регион: ${savedSearch.regionId}\n`;
  }
  if (savedSearch.priceFrom) {
    message += `Цена: от ${savedSearch.priceFrom}\n`;
  }
  if (savedSearch.priceTo) {
    message += `Цена: до ${savedSearch.priceTo}\n`;
  }

  return ERROR_MESSAGES.ERROR_ADS_NOT_FOUND.replace(
    "{searchParameters}",
    message
  );
};
