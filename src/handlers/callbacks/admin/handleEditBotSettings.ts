import { CallbackQuery } from "@telegraf/types";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { BOT_SETTINGS_EDIT_STATE, USER_STATE_ENUM } from "constants/config";
import { ADMIN_EDIT_BOT_SETTINGS_MESSAGES } from "constants/messages";
import { countBrands, countModels } from "services/brandService";
import { updateUser } from "services/User";
import { Context } from "telegraf";
import { getFirstPageForBrandsAdmin } from "utils/pagination/getFirstPages";

export const handleEditBotSettings = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      return;
    }

    const [, action] = (
      ctx.callbackQuery as CallbackQuery.DataQuery
    ).data.split(":");

    switch (action) {
      case BOT_SETTINGS_EDIT_STATE.SUPPORT_USERNAME:
        await updateUser(ctx.from?.id.toString(), {
          state: USER_STATE_ENUM.EDIT_SUPPORT_USERNAME,
        });
        return ctx.reply(ADMIN_EDIT_BOT_SETTINGS_MESSAGES.SUPPORT_USERNAME);
      case BOT_SETTINGS_EDIT_STATE.SUPPORT_TEXT:
        await updateUser(ctx.from?.id.toString(), {
          state: USER_STATE_ENUM.EDIT_SUPPORT_TEXT,
        });
        return ctx.reply(ADMIN_EDIT_BOT_SETTINGS_MESSAGES.SUPPORT_TEXT);
      case BOT_SETTINGS_EDIT_STATE.WATERMARK:
        await updateUser(ctx.from?.id.toString(), {
          state: USER_STATE_ENUM.EDIT_WATERMARK,
        });
        return ctx.reply(ADMIN_EDIT_BOT_SETTINGS_MESSAGES.WATERMARK);
      case BOT_SETTINGS_EDIT_STATE.BRANDS:
        await updateUser(ctx.from?.id.toString(), {
          state: USER_STATE_ENUM.EDIT_BRANDS,
        });
        const brands = await getFirstPageForBrandsAdmin();
        const brandsCount = await countBrands();

        return ctx.reply(
          ADMIN_EDIT_BOT_SETTINGS_MESSAGES.BRANDS.replace(
            "{brandsCount}",
            brandsCount.toString()
          ),
          {
            reply_markup: {
              inline_keyboard: brands,
            },
          }
        );
      case BOT_SETTINGS_EDIT_STATE.MODELS:
        await updateUser(ctx.from?.id.toString(), {
          state: USER_STATE_ENUM.EDIT_MODELS,
        });
        const modelsCount = await countModels();

        return ctx.reply(
          ADMIN_EDIT_BOT_SETTINGS_MESSAGES.MODELS.replace(
            "{modelsCount}",
            modelsCount.toString()
          ),
          {
            reply_markup: {
              inline_keyboard: CLOSE_BUTTONS(),
            },
          }
        );
    }
  } catch (error) {
    return;
  }
};
