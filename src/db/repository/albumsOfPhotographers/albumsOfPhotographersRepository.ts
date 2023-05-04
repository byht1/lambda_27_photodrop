import { getDrizzle } from 'db/connectDB';
import { IAlbumsOfPhotographersRepository, TAddNewAlbumFn } from './type';
import { albumsOfPhotographers } from 'db/schema';

export class AlbumsOfPhotographersRepository {
  constructor(protected db = getDrizzle(), private columns = albumsOfPhotographers) {}

  protected addNewAlbum: TAddNewAlbumFn = async (photographersId, albumId) => {
    await this.db.insert(this.columns).values({ photographersId, albumId });
  };
}
