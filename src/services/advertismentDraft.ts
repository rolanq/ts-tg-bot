import { STEPS_ENUM } from "constants/steps";
import {
  IAdvertisementDraft,
  AdvertisementDraft,
  Advertisement,
} from "utils/db";

export const getAdvertisementDraft = async (
  userId: string
): Promise<IAdvertisementDraft | null> => {
  const draft = await AdvertisementDraft.findOne({
    where: {
      userId: userId,
    },
  });

  if (draft) {
    return draft.get({ plain: true });
  }

  return null;
};

export const createAdvertisementDraft = async (
  userId: string,
  username: string
): Promise<IAdvertisementDraft | null> => {
  const draft = await AdvertisementDraft.create({
    userId: userId,
    currentStep: STEPS_ENUM.REGION,
    telegramUsername: username,
  });

  return draft.get({ plain: true });
};

export const updateAdvertisementDraft = async (
  userId: string,
  data: Partial<IAdvertisementDraft>
): Promise<IAdvertisementDraft | null> => {
  const draft = await AdvertisementDraft.findOne({
    where: { userId: userId },
  });

  if (!draft) {
    return null;
  }

  await draft.update(data);

  return draft.get({ plain: true });
};

export const dropAdvertisementDraft = async (userId: string) => {
  await updateAdvertisementDraft(userId, {
    currentStep: STEPS_ENUM.REGION,
    brandId: null,
    description: null,
    modelId: null,
    engineType: null,
    driveType: null,
    horsePower: null,
    mileage: null,
    phoneNumber: null,
    transmission: null,
    regionId: null,
    year: null,
    price: null,
    photos: [],
  });
}

export const createAdvertisement = async (
  draft: IAdvertisementDraft,
) => {
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
  });

  return advertisement.get({ plain: true });
};
