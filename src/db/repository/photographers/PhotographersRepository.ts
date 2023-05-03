import { eq } from 'drizzle-orm';

import { getDrizzle } from 'db/connectDB';
import { photographers } from 'db/schema';
import {
  IPhotographersRepository,
  TGetByIdFn,
  TGetByIdVerifyFn,
  TGetByLoginFn,
  TTokenUpdateFn,
} from './type';

export class PhotographersRepository implements IPhotographersRepository {
  constructor(private db = getDrizzle(), private table = photographers) {}

  getByLogin: TGetByLoginFn = async searchLogin => {
    const { login, id, password } = this.table;
    const user = await this.db
      .select({ id, password, login })
      .from(this.table)
      .where(eq(login, searchLogin));

    return user.at(0);
  };

  tokenUpdate: TTokenUpdateFn = async (userId, newToken) => {
    const { id, email, createdAt, firstName, lastName } = this.table;
    const user = await this.db
      .update(this.table)
      .set({ token: newToken })
      .where(eq(id, userId))
      .returning({ id, email, createdAt, firstName, lastName });

    return user[0];
  };

  getById: TGetByIdFn = async userId => {
    const { createdAt, email, firstName, lastName, role, id } = this.table;
    const user = await this.db
      .select({ createdAt, email, firstName, lastName, role, id })
      .from(this.table)
      .where(eq(id, userId));

    return user[0];
  };

  getByIdVerify: TGetByIdVerifyFn = async userId => {
    const { id } = this.table;

    const user = await this.db.select().from(this.table).where(eq(id, userId));

    return user.at(0);
  };
}

export const { getByIdVerify: photographersGetByIdVerify, tokenUpdate: photographersTokenUpdate } =
  new PhotographersRepository();
