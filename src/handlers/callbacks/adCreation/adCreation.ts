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

export const registerAdCreationCallback = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery) {
      return ctx.reply(ERROR_MESSAGES.ERROR);
    }

    const data = (callbackQuery as CallbackQuery.DataQuery).data;

    if (data.startsWith("select")) {
      const stepWithId = data.split("_")[1];

      const step = stepWithId.split(":")[0];
      const selected = stepWithId.split(":")[1];

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
