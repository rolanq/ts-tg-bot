import { WhereOptions } from "sequelize";
import {
  Advertisement,
  Brand,
  CarModel,
  IAdvertisement,
  IAdvertisementDraft,
  Region,
} from "utils/db";

export const createAdvertisement = async (draft: IAdvertisementDraft) => {
  const advertisement = await Advertisement.create({
    regionId: draft.regionId!,
    brandId: draft.brandId!,
    modelId: draft.modelId!,
    year: draft.year!,
    engineType: draft.engineType!,
    driveType: draft.driveType!,
    transmission: draft.transmission!,

    horsePower: draft.horsePower!,
    mileage: draft.mileage!,
    description: draft.description!,
    price: draft.price!,
    phoneNumber: draft.phoneNumber!,
    photos: draft.photos!,

    isActive: true,
    isOnHold: false,
    hideReason: null,
    channelStatus: "active",
    userId: draft.userId,
    telegramUsername: draft.telegramUsername,
    autotekaLink: draft.autotekaLink,
  });

  return advertisement.get({ plain: true });
};

export const getAllAdvertisements = async () => {
  const advertisements = await Advertisement.findAll();
  return advertisements.map((advertisement) =>
    advertisement.get({ plain: true })
  );
};

export const getAdvertisements = async (
  whereCondition: WhereOptions<IAdvertisement>
) => {
  const advertisements = await Advertisement.findAll({
    where: { ...whereCondition, isActive: true },
    include: [{ model: Region }, { model: Brand }, { model: CarModel }],
    order: [["createdAt", "DESC"]],
  });

  return advertisements.map((advertisement) =>
    advertisement.get({ plain: true })
  );
};

export const getAdvertisementsByUserId = async (
  userId: string,
  whereCondition?: WhereOptions<IAdvertisement>
) => {
  const advertisements = await Advertisement.findAll({
    where: { ...whereCondition, userId },
  });
  return advertisements.map((ad) => ad.get({ plain: true }));
};

export const getAdvertisementById = async (adId: string) => {
  const advertisement = await Advertisement.findByPk(adId);

  if (!advertisement) {
    return null;
  }

  return advertisement.get({ plain: true });
};

export const updateAdvertisement = async (
  adId: string,
  data: Partial<IAdvertisement>
) => {
  const advertisement = await Advertisement.findByPk(adId);

  if (!advertisement) {
    return null;
  }

  await advertisement.update(data);

  return advertisement.get({ plain: true });
};
