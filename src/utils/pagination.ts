import { InlineKeyboardButton } from "telegraf/typings/core/types/typegram";

type PaginationOptions = {
  itemsPerPage?: number;
  currentPage?: number;
  buttonCallback?: string;
};

export function getPaginatedInlineKeyboard<T>(
  items: T[],
  renderButton: (item: T) => InlineKeyboardButton,
  options: PaginationOptions = {}
) {
  const {
    itemsPerPage = 5,
    currentPage = 1,
    buttonCallback = "page",
  } = options;

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const keyboard: InlineKeyboardButton[][] = [];

  // Добавляем кнопки для текущих элементов
  currentItems.forEach((item) => {
    keyboard.push([renderButton(item)]);
  });

  // Добавляем навигационные кнопки
  const navigationRow: InlineKeyboardButton[] = [];

  if (currentPage > 1) {
    navigationRow.push({
      text: "◀️",
      callback_data: `${buttonCallback}:${currentPage - 1}`,
    });
  }

  navigationRow.push({
    text: `${currentPage}/${totalPages}`,
    callback_data: "ignore",
  });

  if (currentPage < totalPages) {
    navigationRow.push({
      text: "▶️",
      callback_data: `${buttonCallback}:${currentPage + 1}`,
    });
  }

  if (navigationRow.length > 0) {
    keyboard.push(navigationRow);
  }

  return keyboard;
}
