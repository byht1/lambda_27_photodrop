import { AlbumsRepository, TCreateAlbumData } from 'db/repository';
import { IAlbumService, TCreateAlbumFn } from './type';

export class AlbumService implements IAlbumService {
  constructor(private albumsModel: AlbumsRepository = new AlbumsRepository()) {}

  createAlbum: TCreateAlbumFn = async (userId, { albumName, date, location }) => {
    // підлаштовуюсь під фронта в якого вже є бек
    const createObj: TCreateAlbumData = { name: albumName, createdAt: date, location };
    const newAlbum = await this.albumsModel.create(userId, createObj);
    return newAlbum;
  };
}
