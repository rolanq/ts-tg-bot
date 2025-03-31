import { getBrandsPerPage, getModelsPerPage } from "services/brandService";
import { getRegionsPerPage } from "services/regionService";
import { getPaginatedInlineKeyboard } from "utils/pagination";
import {
  renderPaginatedRegionButtons,
  renderPaginatedBrandButtons,
  renderPaginatedModelButtons,
  renderPaginatedYearButtons,
  renderPaginatedEngineTypeButtons,
  renderPaginatedDriveTypeButtons,
  renderPaginatedTransmissionTypeButtons,
} from "../../constants/buttons/renderPaginatedButtons";
import { getYearsPerPage } from "utils/utils";
import {
  ENGINE_TYPES,
  TRANSMISSION_TYPES,
  DRIVE_TYPES,
} from "constants/config";

export const getFirstPageForRegions = async () => {
  const regions = await getRegionsPerPage(1);

  return getPaginatedInlineKeyboard(
    regions.regions,
    renderPaginatedRegionButtons,
    {
      buttonCallback: "page_regions",
      totalItems: regions.total,
      currentPage: 1,
      isLastPage: regions.isLastPage,
    }
  );
};

export const getFirstPageForBrands = async () => {
  const brands = await getBrandsPerPage(1);

  return getPaginatedInlineKeyboard(
    brands.brands,
    renderPaginatedBrandButtons,
    {
      buttonCallback: "page_brands",
      totalItems: brands.total,
      currentPage: 1,
      isLastPage: brands.isLastPage,
    }
  );
};

export const getFirstPageForModels = async (brandId: number) => {
  const models = await getModelsPerPage(1, brandId);

  return getPaginatedInlineKeyboard(
    models.models,
    renderPaginatedModelButtons,
    {
      buttonCallback: "page_models",
      totalItems: models.total,
      currentPage: 1,
      isLastPage: models.isLastPage,
    }
  );
};

export const getFirstPageForYears = () => {
  const years = getYearsPerPage(1);

  return getPaginatedInlineKeyboard(years.years, renderPaginatedYearButtons, {
    buttonCallback: "page_years",
    totalItems: years.total,
    currentPage: 1,
    isLastPage: years.isLastPage,
  });
};

export const getFirstPageForEngineTypes = () => {
  return getPaginatedInlineKeyboard(
    ENGINE_TYPES,
    renderPaginatedEngineTypeButtons,
    {
      buttonCallback: "page_enginetypes",
    }
  );
};

export const getFirstPageForTransmissionTypes = () => {
  return getPaginatedInlineKeyboard(
    TRANSMISSION_TYPES,
    renderPaginatedTransmissionTypeButtons,
    {
      buttonCallback: "page_transmissiontypes",
    }
  );
};

export const getFirstPageForDriveTypes = () => {
  return getPaginatedInlineKeyboard(
    DRIVE_TYPES,
    renderPaginatedDriveTypeButtons,
    {
      buttonCallback: "page_drivetypes",
    }
  );
};
