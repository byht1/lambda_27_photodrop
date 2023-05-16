import { ERootFolder } from './s3.service'

export interface IS3Service {
  generatePresignedUrl: TGeneratePresignedUrlFn
  //   originalUploadFiles: TOriginalUploadFilesFn;
}

export type TGeneratePresignedUrlFn = (pathToFile: string) => string
