import { Message } from "@telegraf/types";
import { getPhotosAndAddWatermark } from "handlers/photos/helpers";
import { WhereOptions } from "sequelize";
import { Context } from "telegraf";
import {
  Advertisement,
  Brand,
  CarModel,
  IAdvertisement,
  IAdvertisementDraft,
  IBotSettings,
  Region,
} from "utils/db";
import { generateRandomId } from "utils/utils";

const photosChannelId = process.env.PHOTOS_CHANNEL_ID;

export const createAdvertisement = async (
  draft: IAdvertisementDraft,
  ctx: Context,
  botSettings: IBotSettings
) => {
  console.log(
    "Starting advertisement creation with draft:",
    JSON.stringify(draft, null, 2)
  );

  const newAdId = await generateRandomIdForAdvertisement();
  console.log("Generated new advertisement ID:", newAdId);

  if (!photosChannelId) {
    throw new Error("PHOTOS_CHANNEL_ID is not set");
  }

  console.log("Processing photos...");
  const newPhotos = await Promise.all(
    draft.photos.map(async (photo, index) => {
      console.log(`Getting file info for photo ${index + 1}`);
      const fileInfo = await ctx.telegram.getFile(photo);
      console.log(`File info for photo ${index + 1}:`, fileInfo);
      return fileInfo;
    })
  );
  console.log("All photos processed:", newPhotos.length);

  console.log("Adding watermark to photos...");
  const processedImageBuffers = await getPhotosAndAddWatermark(
    newPhotos,
    botSettings
  );
  console.log("Watermark added to photos");

  if (!processedImageBuffers || processedImageBuffers.length === 0) {
    throw new Error("No processed images available");
  }

  console.log("Preparing media group...");
  const mediaGroup = processedImageBuffers.map((buffer, index) => {
    console.log(`Preparing media item ${index + 1}`);
    return {
      type: "photo" as const,
      media: { source: buffer },
    };
  });

  if (!mediaGroup || mediaGroup.length === 0) {
    throw new Error("Error preparing media group");
  }

  console.log("Sending media group to channel...");
  const sentPhotos = await ctx.telegram.sendMediaGroup(
    photosChannelId,
    mediaGroup
  );
  console.log("Media group sent successfully");

  console.log("Extracting file IDs from sent photos...");
  const newPhotosToSave = sentPhotos.map((photo, index) => {
    const fileId = (photo as Message.PhotoMessage).photo[0].file_id;
    console.log(`Extracted file ID for photo ${index + 1}:`, fileId);
    return fileId;
  });
  console.log("All file IDs extracted:", newPhotosToSave);

  console.log("Creating advertisement in database...");
  const advertisement = await Advertisement.create({
    id: newAdId,
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
    photos: newPhotosToSave,
    video: draft.video,
    isActive: true,
    isOnHold: false,
    hideReason: null,
    channelStatus: "active",
    userId: draft.userId,
    telegramUsername: draft.telegramUsername,
    autotekaLink: draft.autotekaLink,
  });
  console.log("Advertisement created successfully:", advertisement.get("id"));

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

export const countAdvertisements = async () => {
  const advertisements = await Advertisement.count();
  return advertisements;
};

export const getPhoneNumbers = async () => {
  const advertisements = await Advertisement.findAll({
    attributes: ["phoneNumber"],
  });

  return advertisements.map((ad) => ad.get({ plain: true }).phoneNumber);
};

export const getUniquePhoneNumbers = async () => {
  const phoneNumbers = await getPhoneNumbers();
  return [...new Set(phoneNumbers)];
};

export const getFirstAdvertisementByBrandId = async (brandId: number) => {
  const advertisement = await Advertisement.findOne({
    where: { brandId },
  });
  return advertisement?.get({ plain: true });
};

export const getFirstAdvertisementByModelId = async (modelId: number) => {
  const advertisement = await Advertisement.findOne({
    where: { modelId },
  });
  return advertisement?.get({ plain: true });
};

export const generateRandomIdForAdvertisement = async (): Promise<number> => {
  const id = generateRandomId();

  const advertisement = await Advertisement.findByPk(id);

  if (advertisement) {
    return generateRandomIdForAdvertisement();
  }

  return id;
};
