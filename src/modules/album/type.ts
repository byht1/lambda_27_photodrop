import { TAlbums } from 'db/schema';
import { TCreateAlbumData } from './dto/createAlbum.dto';
import { TGetAllResponse } from 'db/repository/albums/type';

//CONTROLLER_________
export interface IAlbumController {
  createAlbum: TCreateAlbumRoutFn;
  getAlbums: TGetAlbumsRoutFn;
  //   addPhotosToAlbum: any;
  //   getPhotosForAlbum: any;
}

export type TCreateAlbumRoutFn = TRouterFn<TAlbums, TCreateAlbumData>;
export type TGetAlbumsRoutFn = TRouterFn<TGetAllResponse, void, void, TPaginationParamsRequest>;

export type TPaginationParamsRequest = { limit: number; page: number };

//SERVICE_________
export interface IAlbumService {
  createAlbum: TCreateAlbumFn;
  getAlbums: TGetAlbumsFn;
  //   addPhotosToAlbum: any;
  //   getPhotosForAlbum: any;
}

export type TCreateAlbumFn = (userId: string, albumData: TCreateAlbumData) => Promise<TAlbums>;
export type TGetAlbumsFn = (params: TPaginationParamsRequest) => Promise<TGetAllResponse>;
