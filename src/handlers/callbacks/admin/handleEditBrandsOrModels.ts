import { CallbackQuery } from "@telegraf/types";
import { ERROR_MESSAGES } from "constants/messages";
import { getBrandById, getCarModelById } from "services/brandService";
import { Context } from "telegraf";

const handleEditBrand = async (ctx: Context, id: number) => {
  try {
    const brand = await getBrandById(id);

    if (!brand) {
      return ctx.reply(ERROR_MESSAGES.ERROR_BRAND_NOT_FOUND);
    }
    
    
  } catch (error) {
    
  }
}

const handleEditModel = async (ctx: Context, id: number) => {
  try {
    const model = await getCarModelById(id);

    if (!model) {
      return ctx.reply(ERROR_MESSAGES.ERROR_MODEL_NOT_FOUND);
    }
    
    
  } catch (error) {
    
  }
}
export const handleEditBrandsOrModels = async (ctx: Context) => {
  try {
    const [, action, id] = (
      ctx.callbackQuery as CallbackQuery.DataQuery
    ).data.split(":");

    switch (action) {
      case "brand":
        return handleEditBrand(ctx, Number(id));
      case "model":
        return handleEditModel(ctx, Number(id));
    }
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
