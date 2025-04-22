import { Telegraf } from "telegraf";
import { handleBanUser } from "./handleBanUser";
import { handleEditBotSettings } from "./handleEditBotSettings";
import { handleHideAd } from "./handleHideAd";
import { handleDeleteBrand } from "./handleDeleteBrand";
import { handleEditModels } from "./handleEditModels";

export const registerAdminCallbacks = async (bot: Telegraf) => {
  bot.action(/^admin_user_ban:/, handleBanUser);
  bot.action(/^edit_bot_settings:/, handleEditBotSettings);
  bot.action(/^admin_hide_ad:/, handleHideAd);
  bot.action(/^admin_unhide_ad:/, handleHideAd);
  bot.action(/^delete_brand:/, handleDeleteBrand);
  bot.action(/^add_model:/, handleEditModels);
};
