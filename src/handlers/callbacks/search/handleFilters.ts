import { Context } from "telegraf";

import { CHOOSE_MESSAGES, ERROR_MESSAGES } from "constants/messages";
import { CallbackQuery } from "@telegraf/types";
import { getUser, updateUser } from "services/User";
import { USER_STATE_ENUM } from "constants/config";
import { getRegionsPerPage } from "services/regionService";
import { getPaginatedInlineKeyboard } from "utils/pagination";
import {
  renderPaginatedBrandSearchButtons,
  renderPaginatedRegionsSearchButtons,
} from "constants/buttons/renderPaginatedButtons";
import { getBrandsPerPage } from "services/brandService";
import { updateSavedSearch } from "services/savedSearches";
import { getTextAndKeyboardSearch } from "handlers/common/getTextAndKeyboardSearch";
import {
  CLOSE_BUTTONS,
  SEARCH_FILTER_RESET_BUTTON,
} from "constants/buttons/buttons";

export const handleSelectSearchFilter = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const data = (callbackQuery as CallbackQuery.DataQuery).data;
    const [, selectedFilter] = data.split(":");

    const user = await getUser(ctx.from?.id.toString());

    if (!user) {
      return ctx.reply(ERROR_MESSAGES.ERROR_WITH_USER, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    await ctx.deleteMessage();

    switch (selectedFilter) {
      case "region":
        const regions = await getRegionsPerPage(1);

        const regionsKeyboard = getPaginatedInlineKeyboard(
          regions.regions,
          renderPaginatedRegionsSearchButtons,
          {
            buttonCallback: "page_regions",
            totalItems: regions.total,
            currentPage: 1,
            isLastPage: regions.isLastPage,
            resetButton: SEARCH_FILTER_RESET_BUTTON("region"),
          }
        );

        return ctx.reply(CHOOSE_MESSAGES.REGION, {
          reply_markup: { inline_keyboard: regionsKeyboard },
        });
      case "brand":
        const brands = await getBrandsPerPage(1);

        const brandsKeyboard = getPaginatedInlineKeyboard(
          brands.brands,
          renderPaginatedBrandSearchButtons,
          {
            buttonCallback: "page_brands",
            totalItems: brands.total,
            currentPage: 1,
            isLastPage: brands.isLastPage,
            resetButton: SEARCH_FILTER_RESET_BUTTON("brand"),
          }
        );

        return ctx.reply(CHOOSE_MESSAGES.BRAND, {
          reply_markup: { inline_keyboard: brandsKeyboard },
        });
      case "priceFrom":
        await updateUser(ctx.from?.id.toString(), {
          state: USER_STATE_ENUM.SEARCH_PRICE_FROM,
        });
        return ctx.reply(CHOOSE_MESSAGES.PRICE_FROM);
      case "priceTo":
        await updateUser(ctx.from?.id.toString(), {
          state: USER_STATE_ENUM.SEARCH_PRICE_TO,
        });
        return ctx.reply(CHOOSE_MESSAGES.PRICE_TO);
    }
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};

export const handleSaveSearchFilter = async (ctx: Context) => {
  try {
    const { callbackQuery } = ctx;

    if (!callbackQuery || !ctx.from?.id) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    const data = (callbackQuery as CallbackQuery.DataQuery).data;

    const [, selectedFilter, filterId] = data.split(":");

    const filters = {
      [selectedFilter === "brand" ? "brandId" : "regionId"]: Number(filterId),
    };

    await updateSavedSearch(ctx.from?.id.toString(), filters);

    const message = await getTextAndKeyboardSearch(ctx.from?.id.toString());

    if (!message) {
      return ctx.reply(ERROR_MESSAGES.ERROR, {
        reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
      });
    }

    return ctx.reply(message.text, {
      reply_markup: { inline_keyboard: message.keyboard },
    });
  } catch (error) {
    return ctx.reply(ERROR_MESSAGES.ERROR, {
      reply_markup: { inline_keyboard: CLOSE_BUTTONS() },
    });
  }
};
