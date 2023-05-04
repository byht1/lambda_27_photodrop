import { createError } from 'helpers/error/createError';
import { AlbumService } from './album.service';
import { IAlbumController, TCreateAlbumRoutFn, TGetAlbumsRoutFn } from './type';

export class AlbumController implements IAlbumController {
  constructor(private albumService: AlbumService = new AlbumService()) {}

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
}
