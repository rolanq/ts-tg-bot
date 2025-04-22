import { CallbackQuery } from "@telegraf/types";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { USER_STATE_ENUM } from "constants/config";
import {
  ADMIN_EDIT_BOT_SETTINGS_MESSAGES,
  ERROR_MESSAGES,
} from "constants/messages";
import { getFirstAdvertisementByBrandId } from "services/advertisment";
import { deleteBrand, getBrandById } from "services/brandService";
import { updateUser } from "services/User";
import { Context } from "telegraf";

export const handleDeleteBrand = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const [, id] = (ctx.callbackQuery as CallbackQuery.DataQuery).data.split(
      ":"
    );

    const brand = await getBrandById(Number(id));
    if (!brand) {
      return ctx.reply(ERROR_MESSAGES.ERROR_BRAND_NOT_FOUND, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const ad = await getFirstAdvertisementByBrandId(Number(id));

    if (ad) {
      return ctx.reply(ERROR_MESSAGES.ERROR_DELETING_BRAND, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await deleteBrand(Number(id));

    await updateUser(ctx.from.id.toString(), {
      state: USER_STATE_ENUM.MENU,
    });

    await ctx.deleteMessage();

    return ctx.reply(
      ADMIN_EDIT_BOT_SETTINGS_MESSAGES.DELETED_BRAND.replace(
        "{brandName}",
        brand.name
      ),
      {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      }
    );
  } catch (error) {
    console.log(error);

    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
