import { STEPS_ENUM } from "constants/config";
import { IAdvertisementDraft, AdvertisementDraft } from "utils/db";

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
};

export const createIfNotExistsAndZeroOut = async (
  userId: string,
  username: string
) => {
  const draft = await getAdvertisementDraft(userId);

  if (!draft) {
    return await createAdvertisementDraft(userId, username);
  }

  await dropAdvertisementDraft(userId);
  const newDraft = await getAdvertisementDraft(userId);
  return newDraft;
};
