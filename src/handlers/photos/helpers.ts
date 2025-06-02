import { addWatermark } from "utils/addWatermark";
import { IBotSettings } from "utils/db";
import { File } from "@telegraf/types";

export const getPhotosAndAddWatermark = async (
  fileInfo: File[],
  botSettings: IBotSettings
) => {
  console.log("Starting photo processing for", fileInfo.length, "photos");
  console.log("Bot settings:", JSON.stringify(botSettings, null, 2));

  try {
    // Обрабатываем фотографии последовательно
    const processedImageBuffer = [];

    for (let i = 0; i < fileInfo.length; i++) {
      const file = fileInfo[i];
      console.log(`Processing photo ${i + 1}/${fileInfo.length}`);
      console.log("File info:", JSON.stringify(file, null, 2));

      const fileUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`;
      console.log(`Fetching photo from URL: ${fileUrl}`);

      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch photo: ${response.status} ${response.statusText}`
        );
      }
      console.log(`Successfully fetched photo ${i + 1}`);

      const imageBuffer = await response.arrayBuffer();
      console.log(
        `Converted photo ${i + 1} to buffer, size: ${
          imageBuffer.byteLength
        } bytes`
      );

      console.log(`Adding watermark to photo ${i + 1}`);
      const processedBuffer = await addWatermark(
        Buffer.from(imageBuffer),
        botSettings.WatermarkText
      );

      // Проверяем, что буфер не пустой после добавления водяного знака
      if (!processedBuffer || processedBuffer.length === 0) {
        throw new Error(`Watermark processing failed for photo ${i + 1}`);
      }

      console.log(
        `Successfully added watermark to photo ${i + 1}, buffer size: ${
          processedBuffer.length
        } bytes`
      );
      processedImageBuffer.push(processedBuffer);
    }

    console.log("Successfully processed all photos");
    return processedImageBuffer;
  } catch (error) {
    console.error("Error processing photos:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
    throw error; // Пробрасываем ошибку дальше для обработки в createAdvertisement
  }
};
