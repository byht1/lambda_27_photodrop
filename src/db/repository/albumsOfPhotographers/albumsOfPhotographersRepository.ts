import { getDrizzle } from 'db/connectDB';
import { IAlbumsOfPhotographersRepository, TAddNewAlbumFn, THasAlbumForUserFn } from './type';
import { albumsOfPhotographers } from 'db/schema';
import { and, eq } from 'drizzle-orm';

export class AlbumsOfPhotographersRepository implements IAlbumsOfPhotographersRepository {
  constructor(protected db = getDrizzle(), private columns = albumsOfPhotographers) {}

  hasAlbumForUser: THasAlbumForUserFn = async (userId, searchAlbumId) => {
    const { albumId, photographersId } = this.columns;
    const data = await this.db
      .select()
      .from(this.columns)
      .where(and(eq(photographersId, userId), eq(albumId, searchAlbumId)));

    return !!data[0];
  };

  protected addNewAlbum: TAddNewAlbumFn = async (photographersId, albumId) => {
    await this.db.insert(this.columns).values({ photographersId, albumId });
  };
}
