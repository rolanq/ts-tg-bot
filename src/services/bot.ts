import { getAllAdvertisements } from "./advertisment";
import { HIDE_REASONS } from "constants/config";
import { getAllUsers } from "./User";

export const getBotStatistics = async () => {
  const users = await getAllUsers();
  const adCount = await getAllAdvertisements();

  return {
    users,
    adCount: adCount.length,
    activeAdsCount: adCount.filter((ad) => ad.isActive).length,
    soldCount: adCount.filter(
      (ad) => ad.hideReason === HIDE_REASONS.SOLD_BY_BOT
    ).length,
    usersCount: users.length,
  };
};
