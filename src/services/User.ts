import { HIDE_REASONS, USER_STATE_ENUM } from "constants/config";
import { Advertisement, IUser, User } from "utils/db";

export const createUser = async (userId: string, username: string) => {
  const user = await User.create({
    id: userId,
    username: username,
    state: USER_STATE_ENUM.MENU,
    availableListings: 0,
  });

  return user;
};

export const getUser = async (userId: string) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  return user?.get({ plain: true });
};

export const updateUser = async (userId: string, user: Partial<IUser>) => {
  const updatedUser = await User.update(user, {
    where: {
      id: userId,
    },
  });

  return updatedUser;
};

export const createUserIfNotExists = async (
  userId: string,
  username: string
) => {
  const user = await getUser(userId);

  if (!user) {
    const newUser = await createUser(userId, username);
    return newUser;
  }

  return user;
};
export const getUserById = async (userId: string) => {
  const user = await User.findOne({
    where: { id: userId },
  });

  return user?.get({ plain: true });
};

export const getStatisticsByUserId = async (userId: string) => {
  const allAdvertisements = await Advertisement.findAll({
    where: { userId },
  });

  const formattedAdvertisements = allAdvertisements.map((ad) =>
    ad.get({ plain: true })
  );

  return {
    adCount: formattedAdvertisements.length,
    activeAdsCount: formattedAdvertisements.filter((ad) => ad.isActive).length,
    soldCount: formattedAdvertisements.filter(
      (ad) => ad.hideReason === HIDE_REASONS.SOLD_BY_BOT
    ).length,
    totalEarnings: formattedAdvertisements
      .filter((ad) => ad.hideReason === HIDE_REASONS.SOLD_BY_BOT)
      .reduce((acc, ad) => acc + Number(ad.price), 0),
  };
};
