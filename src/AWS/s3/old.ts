import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk';
import { getEnv } from 'helpers';

export enum EFolder {
  ORIGINAL = 'original',
  WATERMARK = 'watermark',
}

export class S3Service {
  private AWS_S3_BUCKET = getEnv('AWS_S3_BUCKET');

  private s3 = new AWS.S3({
    accessKeyId: getEnv('AWS_S3_ACCESS_KEY'),
    secretAccessKey: getEnv('AWS_S3_KEY_SECRET'),
    signatureVersion: 'v4',
  });

  uploadFile = async (file: Express.Multer.File, rootFolder: EFolder, folder: string) => {
    const { originalname } = file;
    const path = `${rootFolder}/${folder}`;

    return await this.upload(file.buffer, this.AWS_S3_BUCKET, originalname, file.mimetype, path);
  };

  deleteFile = async (key: string, rootFolder: EFolder, folder: string) => {
    const path = `${rootFolder}/${folder}`;
    return this.delete(key, path);
  };

  uploadFilesArray = async (files: Express.Multer.File[], rootFolder: EFolder, folder: string) => {
    const path = `${rootFolder}/${folder}`;
    const upload = files.map(
      async ({ buffer, originalname, mimetype }) =>
        await this.uploadOriginal(buffer, this.AWS_S3_BUCKET, originalname, mimetype, path)
    );

    return await Promise.all(upload);
  };

  private uploadOriginal = async (
    file: Buffer,
    bucket: string,
    name: string,
    mimetype: string,
    folder: string
  ) => {
    const params = {
      Bucket: `${bucket}/${folder}`,
      Key: String(name),
      Body: file,
      ACL: 'private',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();

      const objectKey = `${folder}`;
      const expirationTime = 0; // час життя підписаного URL в секундах

      const paramsSigned = {
        Bucket: bucket,
        Key: objectKey,
        Expires: expirationTime,
      };

      const url = this.s3.getSignedUrl('getObject', paramsSigned);

      return url;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  private upload = async (
    file: Buffer,
    bucket: string,
    name: string,
    mimetype: string,
    folder: string
  ) => {
    const params = {
      Bucket: `${bucket}/${folder}`,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();

      return s3Response.Location;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  private delete = async (key: string, folder: string) => {
    const params = {
      Bucket: `${this.AWS_S3_BUCKET}/${folder}`,
      Key: key,
    };

    await this.s3.deleteObject(params).promise();

    return;
  };

  private generateParams = (
    file: Buffer,
    bucket: string,
    name: string,
    mimetype: string,
    folder: string
  ) => {
    const params = {
      Bucket: `${bucket}/${folder}`,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };
  };
}
