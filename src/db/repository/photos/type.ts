import { TNewPhotos, TPhotos } from 'db/schema/photos.schema';

export interface IPhotosRepository {
  addPhotos: TAddPhotosFn;
  getAll: TGetAllFn;
  getById: TGetBuIdFn;
  addPerson: TAddPersonFn;
}

export type TAddPhotosFn = (newPhotos: TNewPhotos[]) => Promise<TPhotos[]>;
export type TGetAllFn = (albumId: string, isOwner: boolean) => Promise<TGetAllPhotosAlbum[]>;
export type TGetBuIdFn = (photoId: string) => Promise<TPhotos | undefined>;
export type TAddPersonFn = (
  photoId: string,
  userId: string,
  isOwner: boolean
) => Promise<TGetAllPhotosAlbum>;

export type TGetAllPhotosAlbum = Omit<TPhotos, 'albumId' | 'originalUrl'>;
