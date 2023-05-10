import { ERootFolder } from './s3.service'

export interface IS3Service {
  uploadFiles: TUploadFilesFn
  //   originalUploadFiles: TOriginalUploadFilesFn;
}

export type TUploadFilesFn = (...args: ArgumentsUploadFilesFn) => Promise<string>
export type TGenerateParamsS3Fn = (...args: ArgumentsGenerateParamsS3Fn) => TBucketParams
export type TUploadToS3Fn = (params: TBucketParams, isPrivate: boolean) => Promise<string>

type ArgumentsUploadFilesFn = [TFile, TRootFolder, string, boolean?]
type ArgumentsGenerateParamsS3Fn = [string, Buffer, TRootFolder, string, string, boolean?]
type TRootFolder = `${ERootFolder}`

export type TBucketParams = {
  Bucket: string
  Key: string
  Body: Buffer
  ACL: TAcl
  ContentType: string
  ContentDisposition: string
  CreateBucketConfiguration: {
    LocationConstraint: string
  }
}

export type TFile = {
  filename: string
  originalname: string
  buffer: Buffer
  mimetype: string
  path: string
}
export type TAcl = 'private' | 'public-read'
