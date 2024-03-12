import uploadConfig from "@config/upload";
import fs from "fs";
import path from "path";
import aws, { S3 } from "aws-sdk";
import mime from "mime";
import AppError from "@shared/errors/AppError";

export class S3StorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_REGION,
    });
  }
  async saveFile(file: string): Promise<void> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) throw new AppError("File not found");

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file, // o nome do arquivo
        ACL: "public-read", // permitir que possa ser lido
        Body: fileContent, // Conteudo do arquivo
        ContentType: ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return;
  }

  async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}
