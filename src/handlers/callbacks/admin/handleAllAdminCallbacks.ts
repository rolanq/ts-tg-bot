import { Context, Telegraf } from "telegraf";
import { handleBanUser } from "./handleBanUser";
import { handleEditBotSettings } from "./handleEditBotSettings";

export const registerAdminCallbacks = async (bot: Telegraf) => {
  bot.action(/^admin_user_ban:/, handleBanUser);
  bot.action(/^edit_bot_settings:/, handleEditBotSettings);
};
