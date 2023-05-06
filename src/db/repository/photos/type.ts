import { TNewPhotos, TPhotos } from 'db/schema/photos.schema';

export interface IPhotosRepository {
  addPhotos: TAddPhotosFn;
  getAll: TGetAllFn;
}

export type TAddPhotosFn = (newPhotos: TNewPhotos[]) => Promise<TPhotos[]>;
export type TGetAllFn = (albumId: string, isOwner: boolean) => Promise<TGetAllPhotosAlbum[]>;

export type TGetAllPhotosAlbum = Omit<TPhotos, 'albumId' | 'originalUrl'>;
