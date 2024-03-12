import uploadConfig from "@config/upload";
import fs from "fs";
import path from "path";

export class DiskStorageProvider {
  async saveFile(file: string): Promise<void> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.directory, file),
    );
    return;
  }

  async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    await fs.promises.unlink(filePath);
  }
}
