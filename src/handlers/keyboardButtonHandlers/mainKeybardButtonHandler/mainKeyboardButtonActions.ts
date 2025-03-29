import { Context } from "telegraf";
import { MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { getFirstPageForRegions } from "utils/pagination/getFirstPages";
import {
  createAdvertisementDraft,
  getAdvertisementDraft,
} from "services/advertismentDraft";
import { EXISTING_ADVERTISEMENT_DRAFT_BUTTONS } from "constants/buttons/buttons";
import { renderAdvertisementDraftMessage } from "./helpers";
import { updateUser } from "services/User";
import { USER_STATE_ENUM } from "constants/userState";

export async function handleCreateAd(ctx: Context) {
  try {
    if (!ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_CREATION);
    }

    await updateUser(ctx.from.id.toString(), {
      state: USER_STATE_ENUM.AD_CREATION,
    });

    await ctx.deleteMessage();

    const existingDraft = await getAdvertisementDraft(ctx.from.id.toString());

    if (existingDraft) {
      return ctx.reply(await renderAdvertisementDraftMessage(existingDraft), {
        reply_markup: {
          inline_keyboard: EXISTING_ADVERTISEMENT_DRAFT_BUTTONS,
        },
      });
    }

    await createAdvertisementDraft(
      ctx.from.id.toString(),
      ctx.from?.username || "Анонимно"
    );

    const keyboard = await getFirstPageForRegions();

    return ctx.reply(MESSAGES.CREATE_AD_CLICKED, {
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_CREATION);
  }
}
