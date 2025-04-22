import { addWatermark } from "utils/addWatermark";
import { IBotSettings } from "utils/db";
import { File } from "@telegraf/types";

export const getPhotoAndAddWatermark = async (
  fileInfo: File,
  botSettings: IBotSettings
) => {
  const fileUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${fileInfo.file_path}`;
  const response = await fetch(fileUrl);
  const imageBuffer = await response.arrayBuffer();
  const processedImageBuffer = await addWatermark(
    Buffer.from(imageBuffer),
    botSettings.WatermarkText
  );
  return processedImageBuffer;
};
