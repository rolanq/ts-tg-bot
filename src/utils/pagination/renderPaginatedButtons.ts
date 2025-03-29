import { InlineKeyboardButton } from "@telegraf/types";
import { IBrand, IRegion, ICarModel } from "../db";

export const renderPaginatedBrandButtons = (
  brand: IBrand
): InlineKeyboardButton => ({
  text: brand.name,
  callback_data: `select_brand:${brand.id}`,
});

export const renderPaginatedRegionButtons = (
  region: IRegion
): InlineKeyboardButton => ({
  text: region.name,
  callback_data: `select_region:${region.id}`,
});

export const renderPaginatedModelButtons = (
  model: ICarModel
): InlineKeyboardButton => ({
  text: model.name,
  callback_data: `select_model:${model.id}`,
});

export const renderPaginatedYearButtons = (year: number): InlineKeyboardButton => ({
  text: year.toString(),
  callback_data: `select_year:${year}`,
});

export const renderPaginatedEngineTypeButtons = (engineType: string): InlineKeyboardButton => ({
  text: engineType,
  callback_data: `select_enginetype:${engineType}`,
});

export const renderPaginatedTransmissionTypeButtons = (transmissionType: string): InlineKeyboardButton => ({
  text: transmissionType,
  callback_data: `select_transmissiontype:${transmissionType}`,
});

export const renderPaginatedDriveTypeButtons = (driveType: string): InlineKeyboardButton => ({
  text: driveType,
  callback_data: `select_drivetype:${driveType}`,
});





