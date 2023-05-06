export interface IAlbumsOfPhotographersRepository {
  // addNewAlbum: TAddNewAlbumFn;
  hasAlbumForUser: THasAlbumForUserFn;
}

export type TAddNewAlbumFn = (ownerId: string, albumId: string) => Promise<void>;
export type THasAlbumForUserFn = (userId: string, searchAlbumId: string) => Promise<boolean>;
