import { TNewPhotos, TPhotos } from 'db/schema/photos.schema'

export interface IPhotosRepository {
  getAll: TGetAllFn
  getById: TGetBuIdFn
  addPerson: TAddPersonFn
  addPhoto: TAddPhotoFn
}

export type TGetAllFn = (albumId: string, isOwner: boolean) => Promise<TGetAllPhotosAlbum[]>
export type TGetBuIdFn = (photoId: string) => Promise<TPhotos | undefined>
export type TAddPersonFn = (
  photoId: string,
  phoneNumbers: string[],
  isOwner: boolean
) => Promise<TGetAllPhotosAlbum>
export type TAddPhotoFn = (newPhoto: TNewPhotos[]) => Promise<void>

// export type TGetAllPhotosAlbum = Omit<TPhotos, 'albumId' | 'originalUrl'>;
export type TGetAllPhotosAlbum = Pick<TPhotos, 'id' | 'name' | 'people'> & TUrl

export type TUrl = {
  smallPhotoURL: string
  largePhotoURL: string
}
