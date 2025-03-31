import { Telegraf } from "telegraf";
import { registerAdCreationCallbacks } from "./adCreation";
import { registerAdDraftCallbacks } from "./adDraft";
import { registerAdPublishCallbacks } from "./adPublish";
import { registerPhotosCallbacks } from "./photos";
export const registerAdCallbacks = (bot: Telegraf) => {
  registerAdCreationCallbacks(bot);
  registerAdDraftCallbacks(bot);
  registerAdPublishCallbacks(bot);
  registerPhotosCallbacks(bot);
};
