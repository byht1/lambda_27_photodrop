import { TAlbums } from 'db/schema';

export interface IAlbumsRepository {
  create: TAlbumsCreateFn;
}

export type TAlbumsCreateFn = (ownerId: string, albumData: TCreateAlbumData) => Promise<TAlbums>;

export type TCreateAlbumData = Pick<TAlbums, 'location' | 'name' | 'createdAt'>;
