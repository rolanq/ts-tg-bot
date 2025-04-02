export const ENGINE_TYPES = ["Бензин", "Дизель", "Газ", "Электро", "Гибрид"];

export const TRANSMISSION_TYPES = ["Механика", "Автомат", "Робот", "Вариатор"];

export const DRIVE_TYPES = ["Передний", "Задний", "Полный"];

export enum HIDE_REASONS {
  SOLD_BY_BOT = `sold_by_bot`,
  SOLD_OTHER = "sold_other",
}

export enum STEPS_ENUM {
  REGION = "region",
  BRAND = "brand",
  MODEL = "model",
  YEAR = "year",
  ENGINETYPE = "enginetype",
  DRIVETYPE = "drivetype",
  TRANSMISSIONTYPE = "transmissiontype",

  HORSEPOWER = "horsepower",
  MILEAGE = "mileage",
  DESCRIPTION = "description",
  PRICE = "price",
  PHONENUMBER = "phonenumber",
  PHOTOS = "photos",
}

export enum USER_STATE_ENUM {
  MENU = "menu",
  AD_CREATION = "adCreation",
  SEARCH_PRICE_FROM = "search_priceFrom",
  SEARCH_PRICE_TO = "search_priceTo",
}

export const HORSE_POWER = {
  MIN: 0,
  MAX: 2500,
};