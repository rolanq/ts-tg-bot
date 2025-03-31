import { CallbackQuery } from "@telegraf/types";
import { Context } from "telegraf";
import { brandStep } from "./adCreationSteps/brandStep";
import { regionStep } from "./adCreationSteps/regionStep";
import { STEPS_ENUM } from "constants/steps";
import { modelStep } from "./adCreationSteps/modelStep";
import { yearStep } from "./adCreationSteps/yearStep";
import { engineTypeStep } from "./adCreationSteps/engineTypeStep";
import { driveTypeStep } from "./adCreationSteps/driveTypeStep";
import { transmissionTypeStep } from "./adCreationSteps/transmissionTypeStep";
import { ERROR_MESSAGES } from "constants/messages";
import { getUser } from "services/User";
import { USER_STATE_ENUM } from "constants/userState";

export const adCreation = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR);
    }

    const user = await getUser(ctx.from?.id.toString());

    if (!user) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_USER);
    }
    
    if (user.state !== USER_STATE_ENUM.AD_CREATION) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_STEP);
    }

    const data = (callbackQuery as CallbackQuery.DataQuery).data;

    if (data.startsWith("select")) {
      const [, step, selected] = data.split(":");

      switch (step as STEPS_ENUM) {
        case STEPS_ENUM.REGION:
          await regionStep(ctx, selected);
          break;
        case STEPS_ENUM.BRAND:
          await brandStep(ctx, selected);
          break;
        case STEPS_ENUM.MODEL:
          await modelStep(ctx, selected);
          break;
        case STEPS_ENUM.YEAR:
          await yearStep(ctx, selected);
          break;
        case STEPS_ENUM.ENGINETYPE:
          await engineTypeStep(ctx, selected);
          break;
        case STEPS_ENUM.DRIVETYPE:
          await driveTypeStep(ctx, selected);
          break;
        case STEPS_ENUM.TRANSMISSIONTYPE:
          await transmissionTypeStep(ctx, selected);
          break;
      }
    }
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
