import { S3Service } from 'AWS';
import { readFileSync } from 'fs';
import { IPhotoService, TAddPhotosToAlbumFn } from './type';

export class PhotosService implements IPhotoService {
  constructor(private s3Service: S3Service = new S3Service()) {}

  addPhotosToAlbum: TAddPhotosToAlbumFn = async (files, albumId) => {
    const photos = files.map(file => ({
      ...file,
      buffer: readFileSync(file.path),
    }));
    const URLs = await this.s3Service.uploadFiles(photos, 'original', albumId);

    return URLs;
  };
}
