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
    // Получаем метаданные изображения
    const metadata = await sharp(imageBuffer).metadata();
    const fontSize = Math.min(metadata.width!, metadata.height!) / 10;

    const watermarkText = `
    <svg width="${metadata.width}" height="${metadata.height}">
      <style>
        .text {
          fill: white;
          font-size: ${fontSize}px;
          font-family: sans-serif;
          opacity: 0.4;
          transform: rotate(-45deg);
        }
      </style>
      <defs>
        <pattern id="watermark" x="0" y="0" width="${
          metadata.width! / 2
        }" height="${metadata.height! / 2}" patternUnits="userSpaceOnUse">
          <text x="50%" y="50%" text-anchor="middle" class="text" dominant-baseline="middle">${
            process.env.WATERMARK
          }</text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#watermark)"/>
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
    console.log(error);

    return imageBuffer;
  }
}
