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
  renderPaginatedBrandButtonsAdmin,
  renderPaginatedModelButtonsAdmin,
  renderPaginatedBrandModelButtonsAdmin,
} from "../../constants/buttons/renderPaginatedButtons";
import { getYearsPerPage } from "utils/utils";
import {
  ENGINE_TYPES,
  TRANSMISSION_TYPES,
  DRIVE_TYPES,
} from "constants/config";
import { STEP_BACK_BUTTON } from "constants/buttons/buttons";

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

export const getFirstPageForBrands = async (
  isEdit: boolean = false,
  withBackButton: boolean = false
) => {
  const brands = await getBrandsPerPage(1);

  return [
    ...getPaginatedInlineKeyboard(brands.brands, renderPaginatedBrandButtons, {
      buttonCallback: "page_brands",
      totalItems: brands.total,
      currentPage: 1,
      isLastPage: brands.isLastPage,
      itemsPerPage: 15,
      isEdit: isEdit,
    }),
    ...(withBackButton ? [...STEP_BACK_BUTTON] : []),
  ];
};

export const getFirstPageForBrandsAdmin = async () => {
  const brands = await getBrandsPerPage(1);

  return getPaginatedInlineKeyboard(
    brands.brands,
    renderPaginatedBrandButtonsAdmin,
    {
      buttonCallback: "page_brands",
      totalItems: brands.total,
      currentPage: 1,
      isLastPage: brands.isLastPage,
      itemsPerPage: 15,
    }
  );
};

export const getFirstPageForModels = async (
  brandId: number,
  isEdit: boolean = false,
  withBackButton: boolean = false
) => {
  const models = await getModelsPerPage(1, brandId);

  return [
    ...getPaginatedInlineKeyboard(models.models, renderPaginatedModelButtons, {
      buttonCallback: "page_models",
      totalItems: models.total,
      currentPage: 1,
      isLastPage: models.isLastPage,
      itemsPerPage: 15,
      isEdit: isEdit,
    }),
    ...(withBackButton ? [...STEP_BACK_BUTTON] : []),
  ];
};

export const getFirstPageForBrandsModelsAdmin = async (name: string) => {
  const brands = await getBrandsPerPage(1);

  return getPaginatedInlineKeyboard(
    brands.brands,
    (brand) => renderPaginatedBrandModelButtonsAdmin(brand, name),
    {
      buttonCallback: "page_brands",
      totalItems: brands.total,
      currentPage: 1,
      isLastPage: brands.isLastPage,
      itemsPerPage: 15,
    }
  );
};

export const getFirstPageForYears = (
  isEdit: boolean = false,
  withBackButton: boolean = false
) => {
  const years = getYearsPerPage(1);

  return [
    ...getPaginatedInlineKeyboard(years.years, renderPaginatedYearButtons, {
      buttonCallback: "page_years",
      totalItems: years.total,
      currentPage: 1,
      isLastPage: years.isLastPage,
      itemsPerPage: 15,
      isEdit: isEdit,
    }),
    ...(withBackButton ? [...STEP_BACK_BUTTON] : []),
  ];
};

export const getFirstPageForEngineTypes = (
  isEdit: boolean = false,
  withBackButton: boolean = false
) => {
  return [
    ...getPaginatedInlineKeyboard(
      ENGINE_TYPES,
      renderPaginatedEngineTypeButtons,
      {
        buttonCallback: "page_enginetypes",
        isEdit: isEdit,
      }
    ),
    ...(withBackButton ? [...STEP_BACK_BUTTON] : []),
  ];
};

export const getFirstPageForTransmissionTypes = (
  isEdit: boolean = false,
  withBackButton: boolean = false
) => {
  return [
    ...getPaginatedInlineKeyboard(
      TRANSMISSION_TYPES,
      renderPaginatedTransmissionTypeButtons,
      {
        buttonCallback: "page_transmissiontypes",
        isEdit: isEdit,
      }
    ),
    ...(withBackButton ? [...STEP_BACK_BUTTON] : []),
  ];
};

export const getFirstPageForDriveTypes = (
  isEdit: boolean = false,
  withBackButton: boolean = false
) => {
  return [
    ...getPaginatedInlineKeyboard(
      DRIVE_TYPES,
      renderPaginatedDriveTypeButtons,
      {
        buttonCallback: "page_drivetypes",
        isEdit: isEdit,
      }
    ),
    ...(withBackButton ? [...STEP_BACK_BUTTON] : []),
  ];
};
