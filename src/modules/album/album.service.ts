import { AlbumsRepository, TCreateAlbumData } from 'db/repository';
import { IAlbumService, TCreateAlbumFn, TGetAlbumsFn } from './type';
import { formatQueryParams } from 'helpers';

export class AlbumService implements IAlbumService {
  constructor(private albumsModel: AlbumsRepository = new AlbumsRepository()) {}

  createAlbum: TCreateAlbumFn = async (userId, { albumName, date, location }) => {
    // підлаштовуюсь під фронта в якого вже є бек
    const createObj: TCreateAlbumData = { name: albumName, createdAt: date, location };
    const newAlbum = await this.albumsModel.create(userId, createObj);
    return newAlbum;
  };

  getAlbums: TGetAlbumsFn = async queryParams => {
    const pagination = formatQueryParams(queryParams);
    const albums = await this.albumsModel.getAll(pagination);

    return albums;
  };

  
}
