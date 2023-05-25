import { TNewPhotos, TPhotos } from 'db/schema/photos.schema'

export interface IPhotosRepository {
  getAll: TGetAllFn
  getById: TGetBuIdFn
  addPerson: TAddPersonFn
  maxPhotosToAlbum: TMaxPhotosToAlbumFn
}

export type TGetAllFn = (albumId: string, isOwner: boolean) => Promise<TGetAllPhotosAlbum[]>
export type TGetBuIdFn = (photoId: string) => Promise<TPhotos | undefined>
export type TAddPersonFn = (
  photoId: string,
  phoneNumbers: string[],
  isOwner: boolean
) => Promise<TGetAllPhotosAlbum>
export type TMaxPhotosToAlbumFn = (userId: string) => Promise<number>

// export type TGetAllPhotosAlbum = Omit<TPhotos, 'albumId' | 'originalUrl'>;
export type TGetAllPhotosAlbum = Pick<TPhotos, 'id' | 'name' | 'people'> & TUrl

export type TUrl = {
  smallPhotoURL: string
  largePhotoURL: string
}
