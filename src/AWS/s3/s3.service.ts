import { S3 } from 'aws-sdk'
import { getEnv } from 'helpers'
import { IS3Service, TUploadFilesFn, TGenerateParamsS3Fn, TAcl, TUploadToS3Fn } from './type'
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
    signatureVersion: 'v4',
  })

  uploadFiles: TUploadFilesFn = async (file, rootFolder, folder, isResized) => {
    const isPrivate = rootFolder === ERootFolder.ORIGINAL
    const { filename, buffer, mimetype } = file
    const params = this.generateParamsS3(filename, buffer, rootFolder, mimetype, folder, isResized)
    return await this.uploadToS3(params, isPrivate)
  }

  private generateParamsS3: TGenerateParamsS3Fn = (...args) => {
    const [name, file, rootFolder, mimetype, folder, isResized] = args

    const dir = `${this.AWS_S3_BUCKET}/${folder}/${rootFolder}${isResized ? '/resized' : ''}`
    const ACL: TAcl = rootFolder === ERootFolder.ORIGINAL ? 'private' : 'public-read'

    const params = {
      Bucket: dir,
      Key: String(name),
      Body: file,
      ACL,
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    }
    return params
  }

  private uploadToS3: TUploadToS3Fn = async (params, isPrivate) => {
    try {
      const s3Response = await this.s3.upload(params).promise()

      if (!isPrivate) return s3Response.Location

      const paramsSigned = {
        Bucket: this.AWS_S3_BUCKET,
        Key: s3Response.Key,
        Expires: 0,
      }

      const url = this.s3.getSignedUrl('getObject', paramsSigned)

      return url
    } catch (e) {
      throw createError(503, 'Error uploading file to the cloud. Please try again later.')
    }
  }
}
