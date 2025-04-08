import { InlineKeyboardButton } from "telegraf/typings/core/types/typegram";

type PaginationOptions = {
  itemsPerPage?: number;
  currentPage?: number;
  buttonCallback?: string;
  totalItems?: number;
  isLastPage?: boolean;
  resetButton?: {
    text: string;
    callback_data: string;
  };
  isEdit?: boolean;
};

export function getPaginatedInlineKeyboard<T>(
  items: T[],
  renderButton: (item: T, isEdit?: boolean) => InlineKeyboardButton,
  options: PaginationOptions = {}
) {
  const {
    itemsPerPage = 15,
    currentPage = 1,
    buttonCallback = "page",
    totalItems = 0,
    isLastPage = false,
    resetButton,
    isEdit = false,
  } = options;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const keyboard: InlineKeyboardButton[][] = [];

  for (let i = 0; i < items.length; i += 3) {
    const currentItems = items.slice(i, i + 3);
    const row: InlineKeyboardButton[] = [];

    row.push(renderButton(currentItems[0], isEdit));

    if (i + 1 < items.length) {
      row.push(renderButton(currentItems[1], isEdit));
    }

    if (i + 2 < items.length) {
      row.push(renderButton(currentItems[2], isEdit));
    }

    keyboard.push(row);
  }

  const navigationRow: InlineKeyboardButton[] = [];

  if (currentPage > 1) {
    navigationRow.push({
      text: "◀️",
      callback_data: `${buttonCallback}:${currentPage - 1}`,
    });
  }

  if (totalItems > itemsPerPage) {
    navigationRow.push({
      text: `Страница ${currentPage} из ${totalPages}`,
      callback_data: "ignore",
    });
  }

  if (currentPage < totalPages && !isLastPage) {
    navigationRow.push({
      text: "▶️",
      callback_data: `${buttonCallback}:${currentPage + 1}`,
    });
  }

  if (navigationRow.length > 0) {
    keyboard.push(navigationRow);
  }

  if (resetButton) {
    keyboard.push([resetButton]);
  }

  return keyboard;
}
