import { SEARCH_PARAMETERS_BUTTONS_FILLED } from "constants/buttons/buttons";
import { MESSAGES } from "constants/messages";
import { getBrandById } from "services/brandService";
import { getRegionById } from "services/regionService";
import { createIfNotExistsSavedSearch } from "services/savedSearches";

export const getTextAndKeyboardSearch = async (userId: string) => {
  let parameters = {
    region: "",
    brand: "",
    priceFrom: "",
    priceTo: "",
  };

  const savedSearch = await createIfNotExistsSavedSearch(userId);

  if (savedSearch.regionId) {
    const region = await getRegionById(savedSearch.regionId);
    if (!region) {
      return null;
    }
    parameters.region = region.name;
  }

  if (savedSearch.brandId) {
    const brand = await getBrandById(savedSearch.brandId);
    if (!brand) {
      return null;
    }
    parameters.brand = brand.name;
  }

  if (savedSearch.priceFrom) {
    parameters.priceFrom = savedSearch.priceFrom.toString();
  }

  if (savedSearch.priceTo) {
    parameters.priceTo = savedSearch.priceTo.toString();
  }

  const keyboard = SEARCH_PARAMETERS_BUTTONS_FILLED(
    parameters.region,
    parameters.brand,
    parameters.priceFrom,
    parameters.priceTo
  );

  return {
    text: MESSAGES.SEARCH_CLICKED,
    keyboard: keyboard,
  };
};
