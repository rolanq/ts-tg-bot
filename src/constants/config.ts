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
  HORSEPOWER_EDIT = "horsepower_edit",
  MILEAGE = "mileage",
  MILEAGE_EDIT = "mileage_edit",
  DESCRIPTION = "description",
  DESCRIPTION_EDIT = "description_edit",
  PRICE = "price",
  PRICE_EDIT = "price_edit",
  PHONENUMBER = "phonenumber",
  PHONENUMBER_EDIT = "phonenumber_edit",
  PHOTOS = "photos",
  PHOTOS_EDIT = "photos_edit",
}

export enum USER_STATE_ENUM {
  MENU = "menu",
  AD_CREATION = "adCreation",
  SEARCH_PRICE_FROM = "search_priceFrom",
  SEARCH_PRICE_TO = "search_priceTo",
}

export const RESTRICTIONS = {
  PHOTOS: { MAX: 10, MIN: 0 },
  PHONE_NUMBER: { MAX: 11, MIN: 0 },
  DESCRIPTION: { MAX: 200, MIN: 0 },
  PRICE: { MAX: 100000000, MIN: 0 },
  HORSEPOWER: { MAX: 5000, MIN: 0 },
  MILEAGE: { MAX: 1000000, MIN: 0 },
};

export const BAD_WORDS = [
  "хуесос",
  "наркотики",
  "наркотик",
  "закладка",
  "клад",
  "котик",
  "котики",
  "проститутка",
  "проститутки",
  "проститут",
  "проституты",
  "проститутка",
  "проститутки",
  "проститут",
  "шлюха",
  "шлюхи",
];
