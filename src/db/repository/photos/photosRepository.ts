import { photos } from 'db/schema/photos.schema';
import { IPhotosRepository, TAddPersonFn, TAddPhotosFn, TGetAllFn, TGetBuIdFn } from './type';
import { getDrizzle } from 'db/connectDB';
import { eq, sql } from 'drizzle-orm';

export class PhotosRepository implements IPhotosRepository {
  constructor(private db = getDrizzle(), private table = photos) {}

  addPhotos: TAddPhotosFn = async newPhotos => {
    const newPhotosResponse = await this.db.insert(this.table).values(newPhotos).returning();
    return newPhotosResponse;
  };

  getAll: TGetAllFn = async (searchAlbumId, isOwner) => {
    const { albumId, id, name, people } = this.table;
    const photosForAlbum = await this.db
      .select({
        id,
        name,
        people,
        url: this.isAlbumOwner(isOwner),
      })
      .from(this.table)
      .where(eq(albumId, searchAlbumId));

    return photosForAlbum;
  };

  getById: TGetBuIdFn = async searchPhotoId => {
    const { id } = this.table;
    const photo = await this.db.select().from(this.table).where(eq(id, searchPhotoId));

    return photo.at(0);
  };

  addPerson: TAddPersonFn = async (searchPhotoId, userId, isOwner) => {
    const { id, name, people } = this.table;
    const photo = await this.db
      .update(this.table)
      .set({ people: sql<string[]>`array_append(${people}, ${userId})` })
      .where(eq(id, searchPhotoId))
      .returning({ id, name, people, url: this.isAlbumOwner(isOwner) });

    return photo[0];
  };

  private isAlbumOwner = (isOwner: boolean) => {
    const { originalUrl, url: watermarkUrl } = this.table;
    return isOwner ? originalUrl : watermarkUrl;
  };
}
