import { IAlbumsRepository, TAlbumsCreateFn } from './type';
import { albums } from 'db/schema';
import { AlbumsOfPhotographersRepository } from '../albumsOfPhotographers/albumsOfPhotographersRepository';

export class AlbumsRepository extends AlbumsOfPhotographersRepository implements IAlbumsRepository {
  constructor(private table = albums) {
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
}
