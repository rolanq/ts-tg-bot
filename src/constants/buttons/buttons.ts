import {
  BOT_SETTINGS_EDIT_STATE,
  HIDE_REASONS,
  STEPS_ENUM,
} from "constants/config";
import { SEARCH_FILTER_RESET_BUTTON_TEXT } from "./buttonsText";
import { IAdvertisement, INotification } from "utils/db";

export const CLOSE_BUTTONS = (messageId?: number) => [
  [
    {
      text: "Закрыть ❌",
      callback_data: messageId ? `close_message:${messageId}` : "close_message",
    },
  ],
];

export const EXISTING_ADVERTISEMENT_DRAFT_BUTTONS = [
  [
    {
      text: "Опубликовать 🚀",
      callback_data: "publish_ad",
    },
  ],
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
  [
    {
      text: "Редактировать 📝",
      callback_data: "edit_ad_draft",
    },
  ],
  ...CLOSE_BUTTONS(),
];

export const EDIT_AD_DRAFT_BUTTONS = [
  [
    {
      text: "Регион 🌎",
      callback_data: `edit_field_draft:${STEPS_ENUM.REGION}`,
    },
    {
      text: "Год 🚙",
      callback_data: `edit_field_draft:${STEPS_ENUM.YEAR}`,
    },
  ],
  [
    {
      text: "Марка 🚙",
      callback_data: `edit_field_draft:${STEPS_ENUM.BRAND}`,
    },
    {
      text: "Модель 🚙",
      callback_data: `edit_field_draft:${STEPS_ENUM.MODEL}`,
    },
  ],
  [
    {
      text: "Тип двигателя 🚙",
      callback_data: `edit_field_draft:${STEPS_ENUM.ENGINETYPE}`,
    },
    {
      text: "Тип привода 🚙",
      callback_data: `edit_field_draft:${STEPS_ENUM.DRIVETYPE}`,
    },
  ],
  [
    {
      text: "Тип коробки передач 🕹️",
      callback_data: `edit_field_draft:${STEPS_ENUM.TRANSMISSIONTYPE}`,
    },
    {
      text: "Мощность двигателя 🐎",
      callback_data: `edit_field_draft:${STEPS_ENUM.HORSEPOWER}`,
    },
  ],
  [
    {
      text: "Пробег 🛣️",
      callback_data: `edit_field_draft:${STEPS_ENUM.MILEAGE}`,
    },
    {
      text: "Описание 📝",
      callback_data: `edit_field_draft:${STEPS_ENUM.DESCRIPTION}`,
    },
  ],
  [
    {
      text: "Цена 💰",
      callback_data: `edit_field_draft:${STEPS_ENUM.PRICE}`,
    },
    {
      text: "Ссылка на автотеку 🔗",
      callback_data: `edit_field_draft:${STEPS_ENUM.AUTOTEKA_LINK}`,
    },
  ],
  [
    {
      text: "Номер телефона 📱",
      callback_data: `edit_field_draft:${STEPS_ENUM.PHONENUMBER}`,
    },
    {
      text: "Фотографии 🖼️",
      callback_data: `edit_field_draft:${STEPS_ENUM.PHOTOS}`,
    },
  ],
  ...CLOSE_BUTTONS(),
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
      text: brand ? `Марка: ${brand} 🚙` : "Выберите марку 🚙",
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
    {
      text: "Сохранить поиск 💾",
      callback_data: "save_search",
    },
  ],
  ...CLOSE_BUTTONS(),
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
      text: "Уведомления 🔔",
      callback_data: "notifications",
    },
  ],
  // TODO: Добавить если понадобится покупка
  // [
  //   {
  //     text: "Купить размещение 💰",
  //     callback_data: "buy_ad_listing",
  //   },
  // ],
  ...CLOSE_BUTTONS(),
];

export const AD_ACTIONS_BUTTONS = (ad: IAdvertisement, messageId?: number) => {
  const keyboard = [];

  if (ad.isActive) {
    keyboard.push(
      [
        {
          text: ad.isOnHold ? "Убрать с задатка 🔒" : "Под задатком 🔒",
          callback_data: ad.isOnHold
            ? `ad_on_hold:remove:${ad.id}:${messageId ? messageId : ""}`
            : `ad_on_hold:set:${ad.id}:${messageId ? messageId : ""}`,
        },
      ],
      [
        {
          text: "Скрыть объявление 🔒",
          callback_data: `hide_ad:${ad.id}:${messageId ? messageId : ""}`,
        },
      ]
    );
  }

  return [...keyboard, ...CLOSE_BUTTONS(messageId)];
};

export const CONFIRM_HIDE_AD_BUTTONS = (adId: string, messageId?: number) => [
  [
    {
      text: "Да, скрыть объявление 🔒",
      callback_data: `confirm_hide_ad:${adId}:${messageId ? messageId : ""}`,
    },
  ],
  ...CLOSE_BUTTONS(messageId),
];

export const HIDE_AD_REASON_BUTTONS = (adId: string) => [
  [
    {
      text: "Продал через бота 💰",
      callback_data: `hide_ad_reason:${HIDE_REASONS.SOLD_BY_BOT}:${adId}`,
    },
  ],
  [
    {
      text: "Продал через другой сервис 💰",
      callback_data: `hide_ad_reason:${HIDE_REASONS.SOLD_OTHER}:${adId}`,
    },
  ],
];

export const ACCEPT_RULES_BUTTONS = [
  [
    {
      text: "Принять правила 📝",
      callback_data: "accept_rules",
    },
  ],
  ...CLOSE_BUTTONS(),
];

export const NOTIFICATION_BUTTONS = (
  notification: INotification,
  brandName: string,
  regionName: string
) => [
  {
    text: `${brandName ? brandName : "Любая марка"} в ${
      regionName ? regionName : "Любой регион"
    }. ${notification.priceFrom ? `От ${notification.priceFrom}` : ""} ${
      notification.priceTo ? `до ${notification.priceTo}` : ""
    }`,
    callback_data: `notification_delete:${notification.id}`,
  },
];

export const NOTIFICATIONS_LIST_BUTTONS = [
  [
    {
      text: "Удалить все уведомления 🗑️",
      callback_data: "delete_all_notifications",
    },
  ],
  ...CLOSE_BUTTONS(),
];

export const SKIP_BUTTON = (callbackData: string) => [
  [
    {
      text: "Пропустить 🔄",
      callback_data: `skip:${callbackData}`,
    },
  ],
];

export const DELETE_AUTOTEKA_LINK_BUTTON = [
  [
    {
      text: "Удалить ссылку на автотеку 🔄",
      callback_data: `delete_autoteka_link`,
    },
  ],
];

export const ADMIN_USER_BUTTONS = (userId: string, action: "ban" | "unban") => [
  [
    {
      text: action === "ban" ? "Заблокировать 🚫" : "Разблокировать 🔓",
      callback_data: `admin_user_ban:${userId}:${action}`,
    },
  ],
  ...CLOSE_BUTTONS(),
];

export const ADMIN_BOT_SETTINGS_BUTTONS = [
  [
    {
      text: "Изменить поддержку 📞",
      callback_data: `edit_bot_settings:${BOT_SETTINGS_EDIT_STATE.SUPPORT_USERNAME}`,
    },
    {
      text: "Изменить текст поддержки 📝",
      callback_data: `edit_bot_settings:${BOT_SETTINGS_EDIT_STATE.SUPPORT_TEXT}`,
    },
  ],
  [
    {
      text: "Изменить водяной знак 🖼️",
      callback_data: `edit_bot_settings:${BOT_SETTINGS_EDIT_STATE.WATERMARK}`,
    },
  ],
  ...CLOSE_BUTTONS(),
];

export const CHANNEL_BUTTON = [
  [
    {
      text: "Перейти в канал 📺",
      url: "https://t.me/prodaisam",
    },
  ],
];
