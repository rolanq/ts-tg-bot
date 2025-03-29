import { EXISTING_ADVERTISEMENT_DRAFT_BUTTONS_TEXT } from "./buttonsText";

export const EXISTING_ADVERTISEMENT_DRAFT_BUTTONS = [
  [
    {
      text: EXISTING_ADVERTISEMENT_DRAFT_BUTTONS_TEXT.CONTINUE,
      callback_data: "continue_ad_draft",
    },
    {
      text: EXISTING_ADVERTISEMENT_DRAFT_BUTTONS_TEXT.NEW,
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