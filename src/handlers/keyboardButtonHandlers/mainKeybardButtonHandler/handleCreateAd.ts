import { EXISTING_ADVERTISEMENT_DRAFT_BUTTONS } from "constants/buttons/buttons";
import { ERROR_MESSAGES, MESSAGES } from "constants/messages";
import { USER_STATE_ENUM } from "constants/userState";
import {
  getAdvertisementDraft,
  createAdvertisementDraft,
} from "services/advertismentDraft";
import { getUser, updateUser } from "services/User";
import { getFirstPageForRegions } from "utils/pagination/getFirstPages";
import { Context } from "telegraf";
import { renderAdvertisementDraftMessage } from "./helpers";

export async function handleCreateAd(ctx: Context) {
  try {
    if (!ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_CREATION);
    }

    const user = await getUser(ctx.from.id.toString());

    if (!user) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_USER);
    }

    if (user.availableListings === 0) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_AD_LISTING);
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
