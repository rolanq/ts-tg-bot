import { CallbackQuery } from "@telegraf/types";
import { Context } from "telegraf";
import { brandStep } from "./adCreationSteps/brandStep";
import { regionStep } from "./adCreationSteps/regionStep";
import { STEPS_ENUM, USER_STATE_ENUM } from "constants/config";
import { modelStep } from "./adCreationSteps/modelStep";
import { yearStep } from "./adCreationSteps/yearStep";
import { engineTypeStep } from "./adCreationSteps/engineTypeStep";
import { driveTypeStep } from "./adCreationSteps/driveTypeStep";
import { transmissionTypeStep } from "./adCreationSteps/transmissionTypeStep";
import { ERROR_MESSAGES } from "constants/messages";
import { getUser } from "services/User";
import { CLOSE_BUTTONS } from "constants/buttons/buttons";
import { checkUserState } from "handlers/common/checkUserState";

export const adCreation = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const user = await getUser(ctx.from?.id.toString());

    if (!user) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_USER, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const isAdCreationStep = await checkUserState(
      ctx.from?.id.toString(),
      USER_STATE_ENUM.AD_CREATION
    );

    if (!isAdCreationStep) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_STEP, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const data = (callbackQuery as CallbackQuery.DataQuery).data;
    
    if (data.startsWith("select")) {
      const [, step, selected, isEdit] = data.split(":");
      const edit = isEdit === "edit";

      switch (step as STEPS_ENUM) {
        case STEPS_ENUM.REGION:
          await regionStep(ctx, selected, edit);
          break;
        case STEPS_ENUM.BRAND:
          await brandStep(ctx, selected, edit);
          break;
        case STEPS_ENUM.MODEL:
          await modelStep(ctx, selected, edit);
          break;
        case STEPS_ENUM.YEAR:
          await yearStep(ctx, selected, edit);
          break;
        case STEPS_ENUM.ENGINETYPE:
          await engineTypeStep(ctx, selected, edit);
          break;
        case STEPS_ENUM.DRIVETYPE:
          await driveTypeStep(ctx, selected, edit);
          break;
        case STEPS_ENUM.TRANSMISSIONTYPE:
          await transmissionTypeStep(ctx, selected, edit);
          break;
      }
    }
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
