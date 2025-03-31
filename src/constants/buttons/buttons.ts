import { SEARCH_FILTER_RESET_BUTTON_TEXT } from "./buttonsText";

export const EXISTING_ADVERTISEMENT_DRAFT_BUTTONS = [
  [
    {
      text: "Продолжить 📝",
      callback_data: "continue_ad_draft",
    },
    {
      text: "Начать заново 🔄",
      callback_data: "new_ad_draft",
    },
  ],
];

export const FINISH_PHOTOS_BUTTONS = [
  [
    {
      text: "Готово 🆗",
      callback_data: "done_photos",
    },
  ],
];

export const PHOTOS_BUTTONS = [
  ...FINISH_PHOTOS_BUTTONS,
  [
    {
      text: "Удалить все фото 🗑️",
      callback_data: "delete_all_photos",
    },
  ],
];

export const AD_PUBLISH_BUTTONS = [
  [
    {
      text: "Опубликовать 🚀",
      callback_data: "publish_ad",
    },
  ],
];

export const SEARCH_PARAMETERS_BUTTONS_FILLED = (
  region: string,
  brand: string,
  priceFrom: string,
  priceTo: string
) => [
  [
    {
      text: region ? `Регион: ${region} 🌎` : "Выберите регион 🌎",
      callback_data: "select_search_filter:region",
    },
    {
      text: brand ? `Бренд: ${brand} 🚙` : "Выберите бренд 🚙",
      callback_data: "select_search_filter:brand",
    },
  ],
  [
    {
      text: priceFrom ? `Цена от: ${priceFrom} 💰` : "Ввести цену от 💰",
      callback_data: "select_search_filter:priceFrom",
    },
    {
      text: priceTo ? `Цена до: ${priceTo} 💰` : "Ввести цену до 💰",
      callback_data: "select_search_filter:priceTo",
    },
  ],
  [
    {
      text: "Искать 🔍",
      callback_data: "search_ads",
    },
  ],
  [
    {
      text: "Сбросить фильтры 🔄",
      callback_data: "search_reset_parameters",
    },
  ],
];

export const SEARCH_FILTER_RESET_BUTTON = (
  filter: keyof typeof SEARCH_FILTER_RESET_BUTTON_TEXT
) => ({
  text: SEARCH_FILTER_RESET_BUTTON_TEXT[filter],
  callback_data: `search_reset_filter:${filter}`,
});

export const PROFILE_BUTTONS = [
  [
    {
      text: "Активные объявления 📝",
      callback_data: "my_ads:active",
    },
    {
      text: "Скрытые объявления 🔒📝",
      callback_data: "my_ads:hidden",
    },
  ],
  [
    {
      text: "Купить размещение 💰",
      callback_data: "buy_ad_listing",
    },
  ],
];

export const HIDE_AD_BUTTONS = (adId: string) => [
  [
    {
      text: "Скрыть объявление 🔒",
      callback_data: `hide_ad:${adId}`,
    },
  ],
];

export const CONFIRM_HIDE_AD_BUTTONS = (adId: string) => [
  [
    {
      text: "Да, скрыть объявление 🔒",
      callback_data: `confirm_hide_ad:${adId}`,
    },
  ],
  [
    {
      text: "Отмена",
      callback_data: `cancel_hide_ad`,
    },
  ],
];
