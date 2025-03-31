import { Telegraf } from "telegraf";
import { registerAdCreationCallbacks } from "./adCreation";
import { registerAdDraftCallbacks } from "./adDraft";
import { registerAdPublishCallbacks } from "./adPublish";
import { registerPhotosCallbacks } from "./photos";
import { registerAdHideCallbacks } from "./adHide";
import { registerAdHoldCallbacks } from "./adHold";
export const registerAdCallbacks = (bot: Telegraf) => {
  registerAdCreationCallbacks(bot);
  registerAdDraftCallbacks(bot);
  registerAdPublishCallbacks(bot);
  registerPhotosCallbacks(bot);
  registerAdHideCallbacks(bot);
  registerAdHoldCallbacks(bot);
};
