import { rm } from 'fs'
import { join as pathJoin } from 'path'
import { S3Service } from 'AWS'
import { IPhotoService, TAddPersonFn, TAddPhotosToAlbumFn, TGetPhotosForAlbumFn } from './type'
import { PhotoService } from 'modules/lib'
import { AlbumsRepository, PhotosRepository } from 'db/repository'
import { createError } from 'helpers/error/createError'
import { TNewPhotos } from 'db/schema/photos.schema'

export class PhotosService implements IPhotoService {
  private pathTemporaryDir = pathJoin(__dirname, '../../temporary')
  constructor(
    private s3Service: S3Service = new S3Service(),
    private photoService: PhotoService = new PhotoService(),
    private albumsModel: AlbumsRepository = new AlbumsRepository(),
    private photosModel: PhotosRepository = new PhotosRepository()
  ) {}

  addPhotosToAlbum: TAddPhotosToAlbumFn = async (files, albumId) => {
    try {
      const album = await this.albumsModel.getById(albumId)
      if (!album) throw createError(404, 'Album is not exit')
      const { name: albumName } = album

      const toProcessedFiles = files.map(async ({ path }) => {
        return await this.photoService.processAndGeneratePhotoVariants(path, albumId)
      })

      const processedFiles = await Promise.all(toProcessedFiles)
      const uploadFilesPromise = processedFiles.map<Promise<TNewPhotos>>(async (file, i) => {
        const { original, originalResized, watermark, watermarkResized } = file

        // Завантажую 1 фотографію в 4 форматах
        const promise1 = this.s3Service.uploadFiles(original, 'original', albumId)
        const promise2 = this.s3Service.uploadFiles(originalResized, 'original', albumId, true)
        const promise3 = this.s3Service.uploadFiles(watermark, 'watermark', albumId)
        const promise4 = this.s3Service.uploadFiles(watermarkResized, 'watermark', albumId, true)

        const [originalUrl, originalResizedUrl, watermarkUrl, watermarkResizedUrl] =
          await Promise.all([promise1, promise2, promise3, promise4])

        return {
          albumId,
          name: `${albumName} photo №${i + 1}`,
          originalResizedUrl,
          originalUrl,
          watermarkResizedUrl,
          watermarkUrl,
        }
      })

      const processedData = await Promise.all(uploadFilesPromise)

      const photoDataResponse = await this.photosModel.addPhotos(processedData)

      return photoDataResponse
    } catch (error) {
      throw error
    }
  }

  getPhotosForAlbum: TGetPhotosForAlbumFn = async (userId, albumId) => {
    const isOwnerAlbum = await this.albumsModel.hasAlbumForUser(userId, albumId)
    const photos = await this.photosModel.getAll(albumId, isOwnerAlbum)
    if (!photos[0]) throw createError(404, 'Album is not exit')

    return photos
  }

  addPerson: TAddPersonFn = async (photoId, userId, photographersId) => {
    const isPhoto = await this.photosModel.getById(photoId)
    if (!isPhoto) throw createError(404, 'Photo is not exit')
    const isOwnerAlbum = await this.albumsModel.hasAlbumForUser(photographersId, isPhoto.albumId)
    const photo = await this.photosModel.addPerson(photoId, userId, isOwnerAlbum)

    return photo
  }

  clearDirectory = (dir: string) => {
    const directory = this.pathTemporaryDir + '/' + dir

    rm(directory, { recursive: true }, error => {
      if (error) {
        console.error('Помилка під час видалення директорії:', error)
      }
    })
  }
}
