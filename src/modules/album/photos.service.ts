import { S3Service } from 'AWS'
import { IPhotoService, TAddPersonFn, TAddPhotosToAlbumFn, TGetPhotosForAlbumFn } from './type'
import { AlbumsRepository, PhotosRepository } from 'db/repository'
import { createError } from 'helpers/error/createError'

export class PhotosService implements IPhotoService {
  private s3Service: S3Service = new S3Service()
  private albumsModel: AlbumsRepository = new AlbumsRepository()
  private photosModel: PhotosRepository = new PhotosRepository()

  addPhotosToAlbum: TAddPhotosToAlbumFn = async (files, albumId) => {
    const albumPromise = this.albumsModel.getById(albumId)
    const countPhotosPromise = this.photosModel.maxPhotosToAlbum(albumId)

    const [album, countPhotos] = await Promise.all([albumPromise, countPhotosPromise])
    if (!album) throw createError(404, 'Album is not exist')
    const { counterPhoto } = album

    const URLs = files.map((filename, i) => {
      const [expansion] = filename.split('.').reverse()
      const path = `albums/temp/${counterPhoto + 1}_${albumId}.${expansion}`
      return this.s3Service.generatePresignedUrl(path)
    })

    await this.albumsModel.updateCount(albumId)

    return URLs
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
}
