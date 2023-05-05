import { createError } from 'helpers/error/createError';
import { AlbumService } from './album.service';
import {
  IAlbumController,
  TAddPhotosToAlbumRoutFn,
  TCreateAlbumRoutFn,
  TGetAlbumsRoutFn,
} from './type';
import { PhotosService } from './photos.service';

export class AlbumController implements IAlbumController {
  constructor(
    private albumService: AlbumService = new AlbumService(),
    private photosService: PhotosService = new PhotosService()
  ) {}

  createAlbum: TCreateAlbumRoutFn = async (req, res) => {
    const albumDataCreate = req.body;
    const user = req.user;
    if (!user) throw createError(500);
    const newAlbum = await this.albumService.createAlbum(user.id, albumDataCreate);
    return res.json(newAlbum);
  };

  getAlbums: TGetAlbumsRoutFn = async (req, res) => {
    const queryParams = req.query;
    const albums = await this.albumService.getAlbums(queryParams);

    return res.json(albums);
  };

  addPhotosToAlbum: TAddPhotosToAlbumRoutFn = async (req, res) => {
    const { albumId } = req.params;
    const files = req.files as Express.Multer.File[];

    const photos = await this.photosService.addPhotosToAlbum(files, albumId);

    return res.json(photos);
  };
}
