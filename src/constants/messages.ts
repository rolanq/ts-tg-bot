export const MESSAGES = {
  WELCOME: "Добро пожаловать! Выберите действие:",
  CREATE_AD_CLICKED: "Переходим к созданию объявления.",
  CREATE_AD_CLICKED_FOR_DRAFT: "Продолжаем создание объявления.",
  CREATE_AD_CLICKED_DRAFT_EXIST:
    "У вас есть черновик объявления.\n {advertisement} \nВы можете его продолжить или начать заново.",
  PHOTOS_LIMIT_REACHED: `Достигнут лимит фотографий (10 штук). Нажмите "Готово 🆗" для просмотра черновика`,
  PHOTOS_RECEIVED: `Фотография {photoNumber}/10 добавлена с водяным знаком. Отправьте еще или нажмите "Готово 🆗"`,
  PHOTOS_DELETED: `Все фотографии удалены. Отправьте новые фотографии или нажмите "Готово 🆗" для просмотра черновика`,
  AD_READY: `Объявление готово к публикации. Нажмите "Опубликовать 🚀" для публикации`,
  AD_PUBLISHED: "Объявление успешно опубликовано!",
  SEARCH_CLICKED: `Переходим к поиску объявлений.\n\nВыберите параметры поиска или оставьте их пустыми`,
  SEARCH_RESET_PARAMETERS: `Параметры поиска сброшены. Выберите новые параметры поиска или оставьте их пустыми`,
  NO_ACTIVE_ADS: "У вас нет активных объявлений.",
  NO_HIDDEN_ADS: "У вас нет скрытых объявлений.",
  AD_LISTING_PURCHASED: "Размещение успешно приобретено!",
  AD_HIDDEN: "Объявление успешно скрыто!\nУкажите причину скрытия объявления:",
  AD_HIDDEN_THANKS: "Объявление скрыто, спасибо за обратную связь!",
  AD_ACTIONS: "Действия с объявлением",
  AD_HIDDEN_CONFIRMATION:
    "Вы уверены, что хотите скрыть объявление?\nПосле скрытия объявление будет нельзя восстановить.",
  AD_HIDE_REASON: "Укажите причину скрытия объявления:",
  SUPPORT_MESSAGE:
    "Если хотите поддержать проект, отправьте денюжку сюда {cardNumber}",
  NOTIFICATION_LIST: "Ваш список поисков. Нажмите на поиск, чтобы удалить его.",
  NEW_CAR_IN_YOUR_SEARCH: "Новое объявление в вашем поиске!\n\n{advertisement}",
  NOTIFICATION_CREATED:
    "Поиск успешно сохранен!\nТеперь вы будете получать уведомления о новых машинах с заданными параметрами",
  NOTIFICATION_DELETED: "Поиск успешно удален!",
  NOTIFICATION_DELETED_ALL: "Все поиски успешно удалены!",
  EDIT_AD_DRAFT:
    "Редактирование черновика объявления. Выберите поле для редактирования:",
  AD_DRAFT_EDITED: "Черновик объявления успешно отредактирован!",
} as const;

export const ERROR_MESSAGES = {
  ERROR: "Произошла ошибка. Попробуйте позже.",
  ERROR_WITH_PHOTOS:
    "Произошла ошибка при добавлении фотографий. Попробуйте позже.",
  ERROR_WITH_REGIONS:
    "Произошла ошибка при загрузке списка регионов. Попробуйте позже.",
  ERROR_WITH_REGION: "Такой регион не найден. Попробуйте позже.",
  ERROR_WITH_BRANDS:
    "Произошла ошибка при загрузке списка брендов. Попробуйте позже.",
  ERROR_WITH_BRAND: "Такой бренд не найден. Попробуйте позже.",
  ERROR_WITH_MODELS:
    "Произошла ошибка при загрузке списка моделей. Попробуйте позже.",
  ERROR_WITH_MODEL: "Такая модель не найдена. Попробуйте позже.",
  ERROR_WITH_AD_DRAFT:
    "Произошла ошибка при загрузке черновика объявления. Попробуйте позже.",
  ERROR_NEED_MORE_INFO:
    "Необходимо заполнить все поля для создания объявления. Создайте новый черновик или продолжите создание объявления.",
  ERROR_WITH_AD_PUBLISH:
    "Произошла ошибка при публикации объявления. Попробуйте позже.",
  ERROR_WITH_AD_CREATION:
    "Произошла ошибка при загрузке попытке создания объявления. Попробуйте позже.",
  ERROR_ADS_NOT_FOUND:
    "Объявления с заданными параметрами не найдены.\n{searchParameters}\nПопробуйте изменить параметры поиска.",
  ERROR_WITH_SAVED_SEARCH:
    "Произошла ошибка при загрузке сохраненного поиска. Попробуйте позже.",
  ERROR_WITH_STEP: "Произошла ошибка. Попробуйте начать сначала.",
  ERROR_WITH_USER:
    "Пользователь не найден. Запустите команду /start и примите правила.",
  ERROR_WITH_AD_LISTING:
    "У вас нет доступных размещений. Купите размещение, чтобы создавать объявления.",
  ERROR_AD_NOT_FOUND: "Объявление не найдено. Попробуйте ещё раз.",
  ERROR_WITH_CHANNEL_MESSAGE:
    "Произошла ошибка при отправке объявления в канал. Попробуйте снова.",
  ERROR_WITH_EDIT_CHANNEL_MESSAGE:
    "Произошла ошибка при редактировании объявления в канале. Попробуйте снова.",
  ERROR_WITH_SAVING_SEARCH:
    "Произошла ошибка при сохранении поиска.\nНеобходимо выбрать хотя бы один параметр поиска.",
  ERROR_NEED_BRAND_ID: "Необходимо выбрать бренд автомобиля.",
  ERROR_NO_NOTIFICATIONS: "У вас нет сохраненных поисков для уведомлений.",

  ERROR_BAD_WORDS:
    "Не используйте ненормативную лексику.\n\nВведите описание заново:",
  ERROR_HORSE_POWER:
    "Мощность двигателя должна быть от 0 до 5.000 л.с.\n\nВведите мощность заново:",
  ERROR_MILEAGE:
    "Пробег должен быть от 0 до 1.000.000 км.\n\nВведите пробег заново:",
  ERROR_PRICE:
    "Цена должна быть от 0 до 100.000.000 руб.\n\nВведите цену заново:",
  ERROR_PHONE_NUMBER:
    "Номер телефона должен быть от 0 до 11 цифр.\nВ формате +79999999999 или 89999999999\n\nВведите номер телефона заново:",
} as const;

export const SAVED_SEARCH_PARAMETERS = `
Регион: {region}
Марка: {brand}
Цена: от {priceFrom} до {priceTo}
`;

export const CHOOSE_MESSAGES = {
  REGION: "Выберите регион продажи: 🌎",
  BRAND: "Выберите бренд автомобиля: 🚙",
  MODEL: "Выберите модель автомобиля: 🚙",
  YEAR: "Выберите год выпуска: 📆",
  ENGINE_TYPE: "Выберите тип двигателя: ⚙️",
  DRIVE_TYPE: "Выберите привод: 🚙",

  HORSE_POWER:
    "Введите мощность двигателя в лошадиных силах: 🐎\n\nОт 0 до 5.000, например 150",
  TRANSMISSION: "Выберите тип коробки передач: 🕹️",
  MILEAGE:
    "Введите пробег автомобиля в километрах: 🛣️\n\nОт 0 до 1.000.000, например 100",
  DESCRIPTION:
    "Введите описание автомобиля: 📝\n\nНе более 200 символов, например 'Автомобиль в хорошем состоянии'",
  PRICE:
    "Введите цену автомобиля в рублях: 💰\n\nОт 0 до 100.000.000, например 100",
  PHONE_NUMBER: "Введите номер телефона для связи: 📱",
  PHOTOS:
    'Отправьте фотографии автомобиля (до 10 штук) 🖼️\n\nПосле завершения нажмите "Готово 🆗":',
  PRICE_FROM: "Введите цену от: 💰",
  PRICE_TO: "Введите цену до: 💰",
};

export const ADVERTISEMENT_MESSAGE = `
Объявление №: {lotId}

🚗 {brandName} {carModel} {year} {status}

📍 Регион: {region}
🛠 Двигатель: {engineType}, {horsePower} л.с.
⚙️ Привод: {driveType}
🔄 КПП: {transmission}
📏 Пробег: {mileage} км

💬 Описание:
{description}

💰 Цена: {price} руб.

📱 Контакты:
Телефон: {phoneNumber}
Telegram: @{telegramUsername}
`;

export const PLURAL_PHOTOS_FORM = (count: number) =>
  count === 1
    ? "фотография"
    : count < 1 && count > 5
    ? "фотографии"
    : "фотографий";

export const ADVERTISEMENT_MESSAGE_DRAFT = (photosCount: number) =>
  ADVERTISEMENT_MESSAGE +
  `
${photosCount} ${PLURAL_PHOTOS_FORM(photosCount)}
`;

export const PROFILE_MESSAGE = (
  userId: string,
  availableListings: number,
  adCount: number,
  activeAdsCount: number,
  soldCount: number,
  totalEarnings: number
) => `
Ваш id: ${userId}

📊 Ваша статистика:
📝 Объявлений опубликовано: ${adCount}
📱 Активных объявлений: ${activeAdsCount}
🚗 Продано машин: ${soldCount}
💰 Доход: ${totalEarnings} руб.
`;

export const RULES_MESSAGE = `
🗒️ Правила использования бота 

1. Основные положения  
🤖 Бот создан для удобного и быстрого размещения объявлений о продаже автомобилей.  
🔐 Вы несете ответственность за достоверность информации и фото.
📝Использование бота означает согласие с правилами.  

2. Что можно делать:  
🚗 Размещать объявления — подробно заполняйте информацию (марка, модель, год, пробег, цена).  
📸 Добавлять фото — не более 10 штук, фото должны быть актуальными и четкими.  
🔍 Искать авто — используйте фильтры (регион, цена, марка).  
🔔 Сохранять поиски — получайте уведомления о новых объявлениях.  

3. Что запрещено:  
🚫 Спам и реклама — кроме автомобилей.  
🚫 Мошенничество — ложные данные, поддельные фото, обман покупателей.  
🚫 Запрещенные товары — нельзя продавать запчасти, шины.  
🚫 Оскорбления — уважайте других пользователей.  

4. Важно:  
📑 Проверяйте информацию — администрация не несет ответственность за содержание объявлений.  
📞 Контакты — указывайте реальный номер телефона и Telegram-логин.  
⚠️ Жалобы — сообщайте о нарушениях администратором указанным ниже.  

5. Советы для успешного объявления:  
💬 Подробное описание — укажите все недостатки и особенности авто.  
🏞️ Качественные фото — покажите салон, кузов, недочеты авто.  
📉Цена ниже рынка — объявления должны быть ниже рыночной цены на аналогичные авто.  

6. Контакты поддержки:  
👤 Администратор: @впишем логин (вопросы, жалобы, помощь).  
⏰ Время работы: ежедневно с 10:00 до 23:00.  

Соблюдайте правила, и ваш автомобиль найдет нового владельца быстро! 🚀
`;
