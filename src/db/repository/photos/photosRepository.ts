import { photos } from 'db/schema/photos.schema';
import { IPhotosRepository, TAddPhotosFn, TGetAllFn } from './type';
import { getDrizzle } from 'db/connectDB';
import { eq } from 'drizzle-orm';

export class PhotosRepository implements IPhotosRepository {
  constructor(private db = getDrizzle(), private table = photos) {}

  addPhotos: TAddPhotosFn = async newPhotos => {
    const newPhotosResponse = await this.db.insert(this.table).values(newPhotos).returning();
    return newPhotosResponse;
  };

  getAll: TGetAllFn = async searchAlbumId => {
    const { albumId } = this.table;
    const photosForAlbum = await this.db
      .select()
      .from(this.table)
      .where(eq(albumId, searchAlbumId));

    return photosForAlbum;
  };
}
