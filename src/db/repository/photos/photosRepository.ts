import { eq, sql } from 'drizzle-orm'
import { getDrizzle } from 'db/connectDB'
import { photos } from 'db/schema/photos.schema'
import { IPhotosRepository, TAddPersonFn, TGetAllFn, TGetBuIdFn, TMaxPhotosToAlbumFn } from './type'
import { arrayCat } from '../helpers'

export class PhotosRepository implements IPhotosRepository {
  constructor(private db = getDrizzle(), private table = photos) {}

  getAll: TGetAllFn = async (searchAlbumId, isOwner) => {
    const { albumId, id, name, people } = this.table
    const URLs = this.isAlbumOwner(isOwner)
    const photosForAlbum = await this.db
      .select({
        id,
        name,
        people,
        ...URLs,
      })
      .from(this.table)
      .where(eq(albumId, searchAlbumId))

    return photosForAlbum
  }

  getById: TGetBuIdFn = async (searchPhotoId) => {
    const { id } = this.table
    const photo = await this.db.select().from(this.table).where(eq(id, searchPhotoId))

    return photo[0]
  }

  addPerson: TAddPersonFn = async (searchPhotoId, phoneNumbers, isOwner) => {
    const { id, name, people } = this.table
    const URLs = this.isAlbumOwner(isOwner)
    const photo = await this.db
      .update(this.table)
      .set({
        people: arrayCat(people, phoneNumbers),
      })
      .where(eq(id, searchPhotoId))
      .returning({ id, name, people, ...URLs })

    return photo[0]
  }

  maxPhotosToAlbum: TMaxPhotosToAlbumFn = async (searchAlbumId) => {
    const { albumId } = this.table
    const [maxDBElements] = await this.db
      .select({ count: sql<number>`count(*)`.mapWith((it) => +it) })
      .from(this.table)
      .where(eq(albumId, searchAlbumId))

    return maxDBElements.count
  }

  private isAlbumOwner = (isOwner: boolean) => {
    const { originalUrl, originalResizedUrl, watermarkResizedUrl, watermarkUrl } = this.table
    return {
      largePhotoURL: isOwner ? originalResizedUrl : watermarkResizedUrl,
      smallPhotoURL: isOwner ? originalUrl : watermarkUrl,
    }
  }
}
