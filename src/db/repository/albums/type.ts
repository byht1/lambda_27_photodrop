import { TAlbums } from 'db/schema';
import { TPaginationResponse } from '../helpers/pagination/type';

export interface IAlbumsRepository {
  create: TAlbumsCreateFn;
  getAll: TGetAllFn;
  getById: TGetByIdFn;
}

export type TAlbumsCreateFn = (ownerId: string, albumData: TCreateAlbumData) => Promise<TAlbums>;
export type TGetAllFn = (params: TPaginationParams) => Promise<TGetAllResponse>;
export type TGetByIdFn = (albumId: string) => Promise<TAlbums | undefined>;

export type TPaginationParams = { limit: number; offset: number };

export type TCreateAlbumData = Pick<TAlbums, 'location' | 'name' | 'createdAt'>;
export type TGetAllResponse = TPaginationResponse<'albums', TAlbums>;
