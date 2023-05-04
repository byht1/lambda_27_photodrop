import { eq } from 'drizzle-orm';

import { getDrizzle } from 'db/connectDB';
import { photographers } from 'db/schema';
import {
  IPhotographersRepository,
  TDeleteInvalidTokensFn,
  TGetByIdFn,
  TGetByLoginFn,
  TTokenUpdateFn,
} from './type';

export class PhotographersRepository implements IPhotographersRepository {
  constructor(private db = getDrizzle(), private table = photographers) {}

  getByLogin: TGetByLoginFn = async searchLogin => {
    const { login, id, password } = this.table;
    const user = await this.db
      .select({ id, password })
      .from(this.table)
      .where(eq(login, searchLogin));

    return user.at(0);
  };

  tokenUpdate: TTokenUpdateFn = async (userId, newToken) => {
    const { id } = this.table;
    const user = await this.db
      .update(this.table)
      .set({ token: newToken })
      .where(eq(id, userId))
      .returning({ id });

    return user[0];
  };

  getById: TGetByIdFn = async userId => {
    const { id } = this.table;
    const user = await this.db.select().from(this.table).where(eq(id, userId));

    return user[0];
  };

  deleteInvalidTokens: TDeleteInvalidTokensFn = async searchToken => {
    const { token } = this.table;
    await this.db.update(this.table).set({ token: '' }).where(eq(token, searchToken));
  };
}
