export interface IAlbumsOfPhotographersRepository {
  addNewAlbum: TAddNewAlbumFn;
}

export type TAddNewAlbumFn = (ownerId: string, albumId: string) => Promise<void>;
