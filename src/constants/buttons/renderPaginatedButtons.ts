import { InlineKeyboardButton } from "@telegraf/types";
import { IBrand, IRegion, ICarModel } from "../../utils/db";

export const renderPaginatedBrandButtons = (
  brand: IBrand
): InlineKeyboardButton => ({
  text: brand.name,
  callback_data: `select_adCreation:brand:${brand.id}`,
});

export const renderPaginatedRegionButtons = (
  region: IRegion
): InlineKeyboardButton => ({
  text: region.name,
  callback_data: `select_adCreation:region:${region.id}`,
});

export const renderPaginatedModelButtons = (
  model: ICarModel
): InlineKeyboardButton => ({
  text: model.name,
  callback_data: `select_adCreation:model:${model.id}`,
});

export const renderPaginatedYearButtons = (
  year: number
): InlineKeyboardButton => ({
  text: year.toString(),
  callback_data: `select_adCreation:year:${year}`,
});

export const renderPaginatedEngineTypeButtons = (
  engineType: string
): InlineKeyboardButton => ({
  text: engineType,
  callback_data: `select_adCreation:enginetype:${engineType}`,
});

export const renderPaginatedTransmissionTypeButtons = (
  transmissionType: string
): InlineKeyboardButton => ({
  text: transmissionType,
  callback_data: `select_adCreation:transmissiontype:${transmissionType}`,
});

export const renderPaginatedDriveTypeButtons = (
  driveType: string
): InlineKeyboardButton => ({
  text: driveType,
  callback_data: `select_adCreation:drivetype:${driveType}`,
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
