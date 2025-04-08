import sharp from "sharp";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tempDir = path.join(__dirname, "../../temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

export async function addWatermark(imageBuffer: Buffer) {
  try {
    // Проверяем входной буфер
    if (!imageBuffer || imageBuffer.length === 0) {
      console.error("Empty image buffer received");
      return imageBuffer;
    }

    // Получаем метаданные изображения и логируем их
    const metadata = await sharp(imageBuffer).metadata();
    console.log("Image metadata:", metadata);

    const watermarkText = `
      <svg width="1280" height="960">
        <text 
          x="640" 
          y="480" 
          font-family="Liberation Sans"
          font-size="120px"
          fill="white"
          text-anchor="middle"
          dominant-baseline="middle"
          style="opacity: 0.5;"
        >${process.env.WATERMARK || "@channel"}</text>
      </svg>
    `;

    // Логируем SVG для проверки
    console.log("Generated SVG:", watermarkText);

    const svgPath = path.join(tempDir, `watermark-${Date.now()}.svg`);
    await promisify(fs.writeFile)(svgPath, watermarkText);

    // Проверяем, что файл создался
    console.log("SVG file created at:", svgPath);
    console.log("SVG file exists:", fs.existsSync(svgPath));

    // Применяем водяной знак
    const result = await sharp(imageBuffer)
      .composite([
        {
          input: svgPath,
          gravity: "center",
        },
      ])
      .jpeg()
      .toBuffer();

    // Удаляем временный файл
    await promisify(fs.unlink)(svgPath);

    return result;
  } catch (error) {
    // Подробное логирование ошибки
    console.error("Error in addWatermark:", error);
    // @ts-ignore
    console.error("Error stack:", error.stack);
    return imageBuffer;
  }
}
