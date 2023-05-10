import { v4 as uuidv4 } from 'uuid';
import { join as pathJoin, basename } from 'path';
import mime from 'mime';
import sharp from 'sharp';
import { getEnv } from 'helpers';
import {
  IPhotoService,
  TAdjustWatermarkToImageFn,
  TApplyWatermarkFn,
  TCreateFileResponseBuilderFn,
  TProcessAndGeneratePhotoVariantsFn,
  TResizePhotoFn,
} from './type';

export class PhotoService implements IPhotoService {
  private WATERMARK_SIZE = getEnv('WATERMARK_SIZE', '0.9');
  private watermarkPhoto = pathJoin(__dirname, '../../../../watermarkPhotoDrop.png');
  private watermarkDir = pathJoin(__dirname, `../../../temporary`);

  processAndGeneratePhotoVariants: TProcessAndGeneratePhotoVariantsFn = async (
    originalPhoto,
    albumPath
  ) => {
    const [expansion] = originalPhoto.split('.').reverse();
    const filename = `${uuidv4()}.${expansion}`;
    const mimetype = mime.getType(`.${expansion}`) || '';
    const newFilePathWatermark = `${this.watermarkDir}/${albumPath}/watermark/${filename}`;
    const newFilePathResizedWatermark = `${this.watermarkDir}/${albumPath}/watermark/min/${filename}`;
    const newFilePathResized = `${this.watermarkDir}/${albumPath}/original/min/${filename}`;

    const fileToBufferPromise = sharp(originalPhoto).toBuffer();
    const watermarkIconPromise = this.adjustWatermarkToImage(originalPhoto);
    const [fileToBuffer, watermarkIcon] = await Promise.all([
      fileToBufferPromise,
      watermarkIconPromise,
    ]);

    const watermarksPromise = this.applyWatermark(
      fileToBuffer,
      watermarkIcon,
      newFilePathWatermark,
      newFilePathResizedWatermark
    );
    const originalResizedPromise = this.resizePhoto(fileToBuffer, newFilePathResized);
    const [watermarks, originalResized] = await Promise.all([
      watermarksPromise,
      originalResizedPromise,
    ]);

    const fileResponseBuilder = this.createFileResponseBuilder(filename, mimetype);

    return {
      watermark: fileResponseBuilder(watermarks.originalSize, newFilePathWatermark),
      watermarkResized: fileResponseBuilder(watermarks.minSize, newFilePathResizedWatermark),
      originalResized: fileResponseBuilder(originalResized, newFilePathResized),
      original: fileResponseBuilder(fileToBuffer, originalPhoto, basename(originalPhoto)),
    };
  };

  private createFileResponseBuilder: TCreateFileResponseBuilderFn = (filename, mimetype) => {
    return (file: Buffer, path: string, name?: string) => ({
      filename: name || filename,
      originalname: name || filename,
      buffer: file,
      mimetype,
      path,
    });
  };

  private applyWatermark: TApplyWatermarkFn = async (
    file,
    watermark,
    pathNewFileOriginalSize,
    pathNewFileMinSize
  ) => {
    const newFile = await sharp(file)
      .composite([
        {
          input: watermark,
          gravity: 'center',
        },
      ])
      .toFile(pathNewFileOriginalSize, err => {
        if (err) {
          console.error(err);
        }
      })
      .toBuffer();

    return { originalSize: newFile, minSize: await this.resizePhoto(newFile, pathNewFileMinSize) };
  };

  private resizePhoto: TResizePhotoFn = async (file, pathNewFile) => {
    const newFile = await sharp(file)
      .resize(200, 200)
      .toFile(pathNewFile, err => {
        if (err) {
          console.error(err);
        }
      });

    return newFile.toBuffer();
  };

  private adjustWatermarkToImage: TAdjustWatermarkToImageFn = async pathToOriginalFile => {
    // Отримуємо розміри оригінального зображення
    const { width: originalWidth, height: originalHeight } = await this.getFileMetadata(
      pathToOriginalFile
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

    return scaledWatermark;
  };

  private getFileMetadata = async (pathToFile: string) => {
    const { width = 0, height = 0 } = await sharp(pathToFile).metadata();

    return { width, height };
  };
}
