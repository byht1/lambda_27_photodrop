import { S3Service } from 'AWS'
import { IPhotoService, TAddPersonFn, TAddPhotosToAlbumFn, TGetPhotosForAlbumFn } from './type'
import { AlbumsRepository, PhotosRepository } from 'db/repository'
import { createError } from 'helpers/error/createError'
import { v4 as uuidv4 } from 'uuid'
import { TNewPhotos } from 'db/schema/photos.schema'

export class PhotosService implements IPhotoService {
  private s3Service: S3Service = new S3Service()
  private albumsModel: AlbumsRepository = new AlbumsRepository()
  private photosModel: PhotosRepository = new PhotosRepository()

  addPhotosToAlbum: TAddPhotosToAlbumFn = async (files, albumId) => {
    const album = await this.albumsModel.getById(albumId)
    if (!album) throw createError(404, 'Album is not exist')
    const { counterPhoto } = album

    const newPhotos: TNewPhotos[] = []

    const URLs = files.map((filename, i) => {
      const [expansion] = filename.split('.').reverse()
      const photoId = uuidv4()
      const newPhoto: TNewPhotos = { id: photoId, albumId }
      newPhotos.push(newPhoto)
      const path = `albums/temp/${counterPhoto + 1 + i}_${albumId}_${photoId}.${expansion}`
      return { photoId, ...this.s3Service.generatePresignedUrl(path) }
    })

    await Promise.all([this.albumsModel.updateCount(albumId), this.photosModel.addPhoto(newPhotos)])

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
