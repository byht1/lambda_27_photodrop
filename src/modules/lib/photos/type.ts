import { TFile } from 'AWS/s3/type';

export interface IPhotoService {
  processAndGeneratePhotoVariants: TProcessAndGeneratePhotoVariantsFn;
}

export type TProcessAndGeneratePhotoVariantsFn = (
  originalPhoto: string,
  albumPath: string
) => Promise<TFileResponse>;

export type TCreateFileResponseBuilderFn = (
  filename: string,
  mimetype: string
) => TFileResponseBuilderFn;
export type TApplyWatermarkFn = (
  file: Buffer,
  watermark: Buffer,
  pathNewFileOriginalSize: string,
  pathNewFileMinSize: string
) => Promise<TApplyWatermarkFnPrivateResponse>;
export type TResizePhotoFn = (file: Buffer, pathNewFile: string) => Promise<Buffer>;
export type TAdjustWatermarkToImageFn = (pathToOriginalFile: string) => Promise<Buffer>;

type TFileResponseBuilderFn = (file: Buffer, path: string, name?: string) => TFile;
export type TFileResponse = {
  watermark: TFile;
  watermarkResized: TFile;
  originalResized: TFile;
  original: TFile;
};
type TApplyWatermarkFnPrivateResponse = {
  originalSize: Buffer;
  minSize: Buffer;
};
