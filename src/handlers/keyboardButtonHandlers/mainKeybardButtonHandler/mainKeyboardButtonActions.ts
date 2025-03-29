import { Context } from "telegraf";
import { MESSAGES } from "constants/messages";
import { getPaginatedInlineKeyboard } from "utils/pagination";
import { InlineKeyboardButton } from "telegraf/typings/core/types/typegram";
import { getAllBrands } from "services/brandService";

export async function handleCreateAd(ctx: Context) {
  try {
    const brands = await getAllBrands();

    const renderCarButton = (brand: {
      id: number;
      name: string;
    }): InlineKeyboardButton => ({
      text: brand.name,
      callback_data: `car_brand:${brand.id}`,
    });

    const keyboard = getPaginatedInlineKeyboard(brands, renderCarButton, {
      itemsPerPage: 4,
      buttonCallback: "car_page",
    });

    return ctx.reply(MESSAGES.CREATE_AD_CLICKED, {
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (error) {
    console.error("Ошибка при получении брендов:", error);
    return ctx.reply(
      "Произошла ошибка при загрузке списка брендов. Попробуйте позже."
    );
  }
}
