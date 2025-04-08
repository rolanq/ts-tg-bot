import { InlineKeyboardButton } from "@telegraf/types";
import { IBrand, IRegion, ICarModel } from "../../utils/db";

export const renderPaginatedBrandButtons = (
  brand: IBrand,
  isEdit: boolean = false
): InlineKeyboardButton => ({
  text: brand.name,
  callback_data: `select_adCreation:brand:${brand.id}:${isEdit ? "edit" : ""}`,
});

export const renderPaginatedRegionButtons = (
  region: IRegion,
  isEdit: boolean = false
): InlineKeyboardButton => ({
  text: region.name,
  callback_data: `select_adCreation:region:${region.id}:${isEdit ? "edit" : ""}`,
});

export const renderPaginatedModelButtons = (
  model: ICarModel,
  isEdit: boolean = false
): InlineKeyboardButton => ({
  text: model.name,
  callback_data: `select_adCreation:model:${model.id}:${isEdit ? "edit" : ""}`,
});

export const renderPaginatedYearButtons = (
  year: number,
  isEdit: boolean = false
): InlineKeyboardButton => ({
  text: year.toString(),
  callback_data: `select_adCreation:year:${year}:${isEdit ? "edit" : ""}`,
});

export const renderPaginatedEngineTypeButtons = (
  engineType: string,
  isEdit: boolean = false
): InlineKeyboardButton => ({
  text: engineType,
  callback_data: `select_adCreation:enginetype:${engineType}:${isEdit ? "edit" : ""}`,
});

export const renderPaginatedTransmissionTypeButtons = (
  transmissionType: string,
  isEdit: boolean = false
): InlineKeyboardButton => ({
  text: transmissionType,
  callback_data: `select_adCreation:transmissiontype:${transmissionType}:${isEdit ? "edit" : ""}`,
});

export const renderPaginatedDriveTypeButtons = (
  driveType: string,
  isEdit: boolean = false
): InlineKeyboardButton => ({
  text: driveType,
  callback_data: `select_adCreation:drivetype:${driveType}:${isEdit ? "edit" : ""}`,
});

export const renderPaginatedRegionsSearchButtons = (
  region: IRegion
): InlineKeyboardButton => ({
  text: region.name,
  callback_data: `save_search_filter:region:${region.id}`,
});

export const renderPaginatedBrandSearchButtons = (
  brand: IBrand
): InlineKeyboardButton => ({
  text: brand.name,
  callback_data: `save_search_filter:brand:${brand.id}`,
});
