import * as fs from "fs";
import * as path from "path";
import { ERROR_MESSAGES } from "constants/messages";
import { getUniquePhoneNumbers } from "services/advertisment";
import { Context } from "telegraf";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const handlePhoneNumbers = async (ctx: Context) => {
  try {
    const phoneNumbers = await getUniquePhoneNumbers();

    const tempDir = path.join(__dirname, "..", "..", "..", "..", "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const tempFilePath = path.join(tempDir, "phone_numbers.txt");

    const phoneNumbersText = phoneNumbers.join("\n");
    fs.writeFileSync(tempFilePath, phoneNumbersText);

    await ctx.replyWithDocument({ source: tempFilePath });
    fs.unlinkSync(tempFilePath);
  } catch (error) {
    console.log(error);

    return ctx.reply(ERROR_MESSAGES.ERROR);
  }
};
