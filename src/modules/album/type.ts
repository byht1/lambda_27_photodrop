import { TAlbums } from 'db/schema';
import { TCreateAlbumData } from './dto/createAlbum.dto';

//CONTROLLER_________
export interface IAlbumController {
  createAlbum: TCreateAlbumRoutFn;
  //   getAlbums: any;
  //   addPhotosToAlbum: any;
  //   getPhotosForAlbum: any;
}

export type TCreateAlbumRoutFn = TRouterFn<TAlbums, TCreateAlbumData>;

//SERVICE_________
export interface IAlbumService {
  createAlbum: TCreateAlbumFn;
  //   getAlbums: any;
  //   addPhotosToAlbum: any;
  //   getPhotosForAlbum: any;
}

export type TCreateAlbumFn = (userId: string, albumData: TCreateAlbumData) => Promise<TAlbums>;
