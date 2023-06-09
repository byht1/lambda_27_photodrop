import { S3 } from 'aws-sdk'
import { getEnv } from 'helpers'
import { IS3Service, TGeneratePresignedUrlFn } from './type'
import { createError } from 'helpers/error/createError'

export enum ERootFolder {
  ORIGINAL = 'original',
  WATERMARK = 'watermark',
}

export class S3Service implements IS3Service {
  private AWS_S3_BUCKET = getEnv('AWS_S3_BUCKET')

  private s3 = new S3({
    accessKeyId: getEnv('AWS_S3_ACCESS_KEY'),
    secretAccessKey: getEnv('AWS_S3_KEY_SECRET'),
    region: 'eu-central-1',
    signatureVersion: 'v4',
  })

  generatePresignedUrl: TGeneratePresignedUrlFn = (pathToFile) => {
    return this.s3.createPresignedPost({
      Bucket: this.AWS_S3_BUCKET,
      Fields: {
        Key: pathToFile,
      },
      Expires: 7200,
    })
  }
}
