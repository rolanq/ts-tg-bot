import { Message } from "@telegraf/types";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import {
  ADMIN_EDIT_BOT_SETTINGS_MESSAGES,
  ERROR_MESSAGES,
} from "constants/messages";
import { deleteModel, getModelByName } from "services/brandService";
import { getFirstAdvertisementByModelId } from "services/advertisment";
import { Context } from "telegraf";
import { getFirstPageForBrandsModelsAdmin } from "utils/pagination/getFirstPages";

export const handleEditModel = async (ctx: Context) => {
  try {
    if (!ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const text = (ctx.message as Message.TextMessage).text;

    const model = await getModelByName(text);

    if (!model) {
      const brands = await getFirstPageForBrandsModelsAdmin(text);

      return ctx.reply(
        ADMIN_EDIT_BOT_SETTINGS_MESSAGES.CHOOSE_BRAND.replace(
          "{modelName}",
          text
        ),
        {
          reply_markup: { inline_keyboard: brands },
        }
      );
    } else if (model.id) {
      const ad = await getFirstAdvertisementByModelId(model.id);

      if (ad) {
        return ctx.reply(ERROR_MESSAGES.ERROR_MODEL_HAS_ADS, {
          reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
        });
      }

      await deleteModel(model.id);

      return ctx.reply(
        ADMIN_EDIT_BOT_SETTINGS_MESSAGES.DELETED_MODEL.replace(
          "{modelName}",
          model.name
        ),
        { reply_markup: { inline_keyboard: CLOSE_BUTTONS() } }
      );
    }
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
