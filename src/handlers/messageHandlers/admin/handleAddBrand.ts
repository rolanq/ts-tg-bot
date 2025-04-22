import { Message } from "@telegraf/types";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { USER_STATE_ENUM } from "constants/config";
import {
  ADMIN_EDIT_BOT_SETTINGS_MESSAGES,
  ERROR_MESSAGES,
} from "constants/messages";
import { addBrand } from "services/brandService";
import { updateUser } from "services/User";
import { Context } from "telegraf";

export const handleAddBrand = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const text = (ctx.message as Message.TextMessage).text;

    const brand = await addBrand(text);

    await updateUser(ctx.from.id.toString(), {
      state: USER_STATE_ENUM.MENU,
    });

    return ctx.reply(
      ADMIN_EDIT_BOT_SETTINGS_MESSAGES.ADDED_BRAND.replace(
        "{brandName}",
        brand.name
      ),
      {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      }
    );
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
