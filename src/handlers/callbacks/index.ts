import { Telegraf } from "telegraf";
import { registerAllPaginations } from "./paginations";
import { registerAdCreationCallbacks } from "./paginations";
import { registerAdDraftCallbacks } from "./adDraft";
import { registerPhotosCallbacks } from "./photos";
import { registerAdPublishCallbacks } from "./adPublish";
export const registerAllCallbacks = (bot: Telegraf) => {
  registerAllPaginations(bot);

  registerAdCreationCallbacks(bot);
  registerAdDraftCallbacks(bot);
  registerAdPublishCallbacks(bot);

  registerPhotosCallbacks(bot);
};
