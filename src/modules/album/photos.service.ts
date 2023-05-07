import { readdir, unlink } from 'fs';
import { join as pathJoin } from 'path';
import { S3Service } from 'AWS';
import { readFileSync } from 'fs';
import { IPhotoService, TAddPersonFn, TAddPhotosToAlbumFn, TGetPhotosForAlbumFn } from './type';
import { WatermarkService } from 'modules/lib';
import { AlbumsRepository, PhotosRepository } from 'db/repository';
import { createError } from 'helpers/error/createError';
import { TNewPhotos } from 'db/schema/photos.schema';

export class PhotosService implements IPhotoService {
  private pathOriginalDir = pathJoin(__dirname, '../../temporary/original');
  private pathWatermarkDir = pathJoin(__dirname, '../../temporary/watermark');
  constructor(
    private s3Service: S3Service = new S3Service(),
    private watermarkService: WatermarkService = new WatermarkService(),
    private albumsModel: AlbumsRepository = new AlbumsRepository(),
    private photosModel: PhotosRepository = new PhotosRepository()
  ) {}

  addPhotosToAlbum: TAddPhotosToAlbumFn = async (files, albumId) => {
    try {
      const album = await this.albumsModel.getById(albumId);
      if (!album) throw createError(404, 'Album is not exit');
      const { name: albumName } = album;

      const photos = files.map(file => ({
        ...file,
        buffer: readFileSync(file.path),
      }));
      const toWatermarkPromise = files.map(async ({ path }) => {
        return await this.watermarkService.applyWatermark(path);
      });

      const toWatermark = await Promise.all(toWatermarkPromise);

      const URLsPromise = this.s3Service.uploadFiles(photos, 'original', albumId);
      const privateURLsPromise = this.s3Service.uploadFiles(toWatermark, 'watermark', albumId);

      const { original, watermark } = await Promise.all([URLsPromise, privateURLsPromise]).then(
        res => ({
          original: res[0],
          watermark: res[1],
        })
      );

      const processedData: TNewPhotos[] = watermark.map((url, i) => ({
        albumId,
        url,
        originalUrl: original[i],
        name: `${albumName} photo №${i + 1}`,
      }));

      const photoDataResponse = await this.photosModel.addPhotos(processedData);

      return photoDataResponse;
    } catch (error) {
      throw error;
    } finally {
      this.clearDirectory('original');
      this.clearDirectory('watermark');
    }
  };

  getPhotosForAlbum: TGetPhotosForAlbumFn = async (userId, albumId) => {
    const isOwnerAlbum = await this.albumsModel.hasAlbumForUser(userId, albumId);
    const photos = await this.photosModel.getAll(albumId, isOwnerAlbum);
    if (!photos[0]) throw createError(404, 'Album is not exit');

    return photos;
  };

  addPerson: TAddPersonFn = async (photoId, userId, photographersId) => {
    const isPhoto = await this.photosModel.getById(photoId);
    if (!isPhoto) throw createError(404, 'Photo is not exit');
    const isOwnerAlbum = await this.albumsModel.hasAlbumForUser(photographersId, isPhoto.albumId);
    const photo = await this.photosModel.addPerson(photoId, userId, isOwnerAlbum);

    return photo;
  };

  private clearDirectory = (dir: 'original' | 'watermark') => {
    const directory = dir === 'original' ? this.pathOriginalDir : this.pathWatermarkDir;
    readdir(directory, (err, files) => {
      if (err) throw err;

      files.forEach(file => {
        if (file !== '.gitkeep') {
          unlink(pathJoin(directory, file), err => {
            if (err) throw err;
          });
        }
      });
    });
  };
}
