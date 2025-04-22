import { CallbackQuery } from "@telegraf/types";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import {
  ADMIN_EDIT_BOT_SETTINGS_MESSAGES,
  ERROR_MESSAGES,
} from "constants/messages";
import { addModel, getBrandById } from "services/brandService";
import { Context } from "telegraf";

export const handleEditModels = async (ctx: Context) => {
  try {
    const [, name, brandId] = (
      ctx.callbackQuery as CallbackQuery.DataQuery
    ).data.split(":");

    const brand = await getBrandById(Number(brandId));

    if (!brand) {
      return ctx.reply(ERROR_MESSAGES.ERROR_BRAND_NOT_FOUND, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }
    const model = await addModel(name, Number(brandId));

    return ctx.reply(
      ADMIN_EDIT_BOT_SETTINGS_MESSAGES.ADDED_MODEL.replace(
        "{modelName}",
        model.name
      ).replace("{brandName}", brand.name)
    );
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
