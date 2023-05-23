import { S3 } from 'aws-sdk'

export interface IS3Service {
  generatePresignedUrl: TGeneratePresignedUrlFn
}

export type TGeneratePresignedUrlFn = (pathToFile: string) => S3.PresignedPost
