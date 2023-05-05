import { TNewPhotos, TPhotos } from 'db/schema/photos.schema';

export interface IPhotosRepository {
  addPhotos: TAddPhotosFn;
  getAll: TGetAllFn;
}

export type TAddPhotosFn = (newPhotos: TNewPhotos[]) => Promise<TPhotos[]>;
export type TGetAllFn = (albumId: string) => Promise<TPhotos[]>;
