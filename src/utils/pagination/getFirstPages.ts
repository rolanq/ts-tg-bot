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

export const getFirstPageForRegions = async (isEdit: boolean = false) => {
  const regions = await getRegionsPerPage(1);

  return getPaginatedInlineKeyboard(
    regions.regions,
    renderPaginatedRegionButtons,
    {
      buttonCallback: "page_regions",
      totalItems: regions.total,
      currentPage: 1,
      isLastPage: regions.isLastPage,
      itemsPerPage: 15,
      isEdit: isEdit,
    }
  );
};

export const getFirstPageForBrands = async (isEdit: boolean = false) => {
  const brands = await getBrandsPerPage(1);

  return getPaginatedInlineKeyboard(
    brands.brands,
    renderPaginatedBrandButtons,
    {
      buttonCallback: "page_brands",
      totalItems: brands.total,
      currentPage: 1,
      isLastPage: brands.isLastPage,
      itemsPerPage: 15,
      isEdit: isEdit,
    }
  );
};

export const getFirstPageForModels = async (brandId: number, isEdit: boolean = false) => {
  const models = await getModelsPerPage(1, brandId);

  return getPaginatedInlineKeyboard(
    models.models,
    renderPaginatedModelButtons,
    {
      buttonCallback: "page_models",
      totalItems: models.total,
      currentPage: 1,
      isLastPage: models.isLastPage,
      itemsPerPage: 15,
      isEdit: isEdit,
    }
  );
};

export const getFirstPageForYears = (isEdit: boolean = false) => {
  const years = getYearsPerPage(1);

  return getPaginatedInlineKeyboard(years.years, renderPaginatedYearButtons, {
    buttonCallback: "page_years",
    totalItems: years.total,
    currentPage: 1,
    isLastPage: years.isLastPage,
    itemsPerPage: 15,
    isEdit: isEdit,
  });
};

export const getFirstPageForEngineTypes = (isEdit: boolean = false) => {
  return getPaginatedInlineKeyboard(
    ENGINE_TYPES,
    renderPaginatedEngineTypeButtons,
    {
      buttonCallback: "page_enginetypes",
      isEdit: isEdit,
    }
  );
};

export const getFirstPageForTransmissionTypes = (isEdit: boolean = false) => {
  return getPaginatedInlineKeyboard(
    TRANSMISSION_TYPES,
    renderPaginatedTransmissionTypeButtons,
    {
      buttonCallback: "page_transmissiontypes",
      isEdit: isEdit,
    }
  );
};

export const getFirstPageForDriveTypes = (isEdit: boolean = false) => {
  return getPaginatedInlineKeyboard(
    DRIVE_TYPES,
    renderPaginatedDriveTypeButtons,
    {
      buttonCallback: "page_drivetypes",
      isEdit: isEdit,
    }
  );
};
