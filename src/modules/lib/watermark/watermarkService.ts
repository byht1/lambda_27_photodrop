import { v4 as uuidv4 } from 'uuid';
import { join as pathJoin } from 'path';
import { readFileSync } from 'fs';
import mime from 'mime';
import sharp from 'sharp';
import { getEnv } from 'helpers';

export class WatermarkService {
  private WATERMARK_SIZE = getEnv('WATERMARK_SIZE', '0.9');
  private watermarkPhoto = pathJoin(__dirname, './watermarkPhotoDrop.png');
  private watermarkDir = pathJoin(__dirname, `../../../temporary/watermark`);

  applyWatermark = async (originalPhoto: string) => {
    const [expansion] = originalPhoto.split('.').reverse();
    const filename = `${uuidv4()}.${expansion}`;
    const newFilePath = `${this.watermarkDir}/${filename}`;

    // Отримуємо розміри оригінального зображення
    const { width: originalWidth, height: originalHeight } = await this.getFileMetadata(
      originalPhoto
    );

    // Отримуємо розміри водяного знаку
    const { width: watermarkWidth, height: watermarkHeight } = await this.getFileMetadata(
      this.watermarkPhoto
    );

    // Обчислюємо розміри водяного знаку з урахуванням пропорцій
    const ratio = Math.min(
      (originalWidth / watermarkWidth) * this.WATERMARK_SIZE,
      (originalHeight / watermarkHeight) * this.WATERMARK_SIZE
    );
    const scaledWidth = Math.round(watermarkWidth * ratio);
    const scaledHeight = Math.round(watermarkHeight * ratio);

    // Масштабуємо водяний знак до відповідних розмірів
    const scaledWatermark = await sharp(this.watermarkPhoto)
      .resize(scaledWidth, scaledHeight)
      .toBuffer();

    const file = await sharp(originalPhoto)
      .composite([
        {
          input: scaledWatermark,
          gravity: 'center', // Розміщуємо в лівому нижньому куті
        },
      ])
      .toFile(newFilePath, (err, info) => {
        if (err) {
          console.error(err);
        } else {
          console.log(info);
        }
      });

    return {
      filename,
      originalname: filename,
      buffer: await file.toBuffer(),
      mimetype: mime.getType(`.${expansion}`) || '',
      path: newFilePath,
    };
  };

  private getFileMetadata = async (pathToFile: string) => {
    const { width = 0, height = 0 } = await sharp(pathToFile).metadata();

    return { width, height };
  };
}
