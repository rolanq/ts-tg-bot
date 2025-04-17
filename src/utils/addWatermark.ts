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

export async function addWatermark(imageBuffer: Buffer, watermarkText: string) {
  try {
    const metadata = await sharp(imageBuffer).metadata();
    const fontSize = Math.min(metadata.width!, metadata.height!) / 6;

    const watermarkTextSvg = `
    <svg width="${metadata.width}" height="${metadata.height}" viewBox="0 0 ${
      metadata.width
    } ${metadata.height}">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:white;stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:white;stop-opacity:0.7" />
          </linearGradient>
        </defs>
        <style>
          .text {
            fill: white;
            font-size: ${fontSize}px;
            font-family: "Liberation Sans", sans-serif;
            font-weight: bold;
            opacity: 0.4;
            stroke: gray;
            stroke-width: 1px;
          }
        </style>
        <g transform="translate(${metadata.width! / 2} ${
      metadata.height! / 2
    })">
          <g transform="rotate(-30)">
            <text 
              x="0" 
              y="0" 
              text-anchor="middle" 
              dominant-baseline="middle"
              class="text"
            >${watermarkText}</text>
          </g>
        </g>
      </svg>
  `;

    const svgPath = path.join(tempDir, `watermark-${Date.now()}.svg`);
    await promisify(fs.writeFile)(svgPath, watermarkTextSvg);

    const result = await sharp(imageBuffer)
      .composite([
        {
          input: svgPath,
          gravity: "center",
          blend: "over",
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
