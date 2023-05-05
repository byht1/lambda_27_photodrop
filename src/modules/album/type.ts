import { TAlbums } from 'db/schema';
import { TCreateAlbumData } from './dto/createAlbum.dto';
import { TGetAllResponse } from 'db/repository/albums/type';
import { TPhotos } from 'db/schema/photos.schema';

//CONTROLLER_________
export interface IAlbumController {
  createAlbum: TCreateAlbumRoutFn;
  getAlbums: TGetAlbumsRoutFn;
  addPhotosToAlbum: TAddPhotosToAlbumRoutFn;
  //   getPhotosForAlbum: any;
}

export type TCreateAlbumRoutFn = TRouterFn<TAlbums, TCreateAlbumData>;
export type TGetAlbumsRoutFn = TRouterFn<TGetAllResponse, void, void, TPaginationParamsRequest>;
export type TAddPhotosToAlbumRoutFn = TRouterFn<TPhotos[], void, TParamsAlbumId>;

export type TPaginationParamsRequest = { limit: number; page: number };
export type TParamsAlbumId = { albumId: string };

//SERVICE_________
//AlbumService
export interface IAlbumService {
  createAlbum: TCreateAlbumFn;
  getAlbums: TGetAlbumsFn;
}

export type TCreateAlbumFn = (userId: string, albumData: TCreateAlbumData) => Promise<TAlbums>;
export type TGetAlbumsFn = (params: TPaginationParamsRequest) => Promise<TGetAllResponse>;

//PhotoService
export interface IPhotoService {
  addPhotosToAlbum: TAddPhotosToAlbumFn;
  //   getPhotosForAlbum: any;
}

export type TAddPhotosToAlbumFn = (
  files: Express.Multer.File[],
  albumId: string
) => Promise<TPhotos[] | any>;
