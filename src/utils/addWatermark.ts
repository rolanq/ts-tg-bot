import sharp from "sharp";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tempDir = path.join(__dirname, "../../temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

export async function addWatermark(imageBuffer: Buffer) {
  try {
    // Получаем метаданные изображения
    const metadata = await sharp(imageBuffer).metadata();

    const watermarkText = `
        <svg width="${metadata.width}" height="${metadata.height}">
          <style>
            .text {
              fill: white;
              font-size: 80px;
              font-weight: bold;
              opacity: 0.3;
              font-family: Arial, sans-serif;
            }
          </style>
          <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" class="text">WATERMARK</text>
        </svg>
      `;

    const svgPath = path.join(tempDir, `watermark-${Date.now()}.svg`);
    await promisify(fs.writeFile)(svgPath, watermarkText);

    const result = await sharp(imageBuffer)
      .composite([
        {
          input: svgPath,
          gravity: "center",
        },
      ])
      .jpeg({ quality: 90 })
      .toBuffer();

    await promisify(fs.unlink)(svgPath);
    return result;
  } catch (error) {
    return imageBuffer;
  }
}
