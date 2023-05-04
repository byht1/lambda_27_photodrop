import { IAlbumsRepository, TAlbumsCreateFn, TGetAllFn } from './type';
import { TableAlbums, albums } from 'db/schema';
import { AlbumsOfPhotographersRepository } from '../albumsOfPhotographers/albumsOfPhotographersRepository';
import { CountPagination } from '../helpers';

export class AlbumsRepository extends AlbumsOfPhotographersRepository implements IAlbumsRepository {
  constructor(
    private table = albums,
    private count: CountPagination<TableAlbums> = new CountPagination(albums)
  ) {
    super();
  }

  create: TAlbumsCreateFn = async (owner, albumData) => {
    const [newAlbum] = await this.db
      .insert(this.table)
      .values({ owner, ...albumData })
      .returning();

    await this.addNewAlbum(owner, newAlbum.id);

    return newAlbum;
  };

  getAll: TGetAllFn = async ({ limit, offset }) => {
    const maxElementPromise = this.count.getMaxElementsCount();
    const albumPromise = this.db.select().from(this.table).offset(offset).limit(limit);
    const [albums, maxElement] = await Promise.all([albumPromise, maxElementPromise]);
    const maxPage = Math.ceil(maxElement / limit);
    return { maxPage, albums };
  };
}
