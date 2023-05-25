import { createError } from 'helpers/error/createError'
import { AlbumService } from './album.service'
import {
  IAlbumController,
  TAddPersonRoutFn,
  TAddPhotosToAlbumRoutFn,
  TCreateAlbumRoutFn,
  TGetAlbumsRoutFn,
  TGetPhotosForAlbumRoutFn,
} from './type'
import { PhotosService } from './photos.service'

export class AlbumController implements IAlbumController {
  public breakpointName: string = 'albums'
  private albumService = new AlbumService()
  private photosService = new PhotosService()

  createAlbum: TCreateAlbumRoutFn = async (req, res) => {
    const albumDataCreate = req.body
    const user = req.user
    if (!user) throw createError(500)
    const newAlbum = await this.albumService.createAlbum(user.id, albumDataCreate)
    return res.json(newAlbum)
  }

  getAlbums: TGetAlbumsRoutFn = async (req, res) => {
    const queryParams = req.query
    const albums = await this.albumService.getAlbums(queryParams)

    return res.json(albums)
  }

  addPhotosToAlbum: TAddPhotosToAlbumRoutFn = async (req, res) => {
    const { albumId } = req.params
    const { photos } = req.body

    const presignedURLs = await this.photosService.addPhotosToAlbum(photos, albumId)

    return res.json(presignedURLs)
  }

  getPhotosForAlbum: TGetPhotosForAlbumRoutFn = async (req, res) => {
    const { albumId } = req.params
    const user = req.user
    if (!user) throw createError(500)

    const photos = await this.photosService.getPhotosForAlbum(user.id, albumId)

    return res.json(photos)
  }

  addPerson: TAddPersonRoutFn = async (req, res) => {
    const { photoId, phoneNumbers } = req.body
    const user = req.user
    if (!user) throw createError(500)

    const photo = await this.photosService.addPerson(photoId, phoneNumbers, user.id)

    return res.json(photo)
  }
}
