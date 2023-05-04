import { TPhotographers } from 'db/schema';

export interface IPhotographersRepository {
  getByLogin: TGetByLoginFn;
  tokenUpdate: TTokenUpdateFn;
  getById: TGetByIdFn;
  deleteInvalidTokens: TDeleteInvalidTokensFn;
}

export type TGetByLoginFn = (...args: [string]) => Promise<TGetByLoginResponse | undefined>;
export type TTokenUpdateFn = (...args: [string, string]) => Promise<TTokenUpdateResponse>;
export type TGetByIdFn = (id: string) => Promise<TPhotographers>;
export type TDeleteInvalidTokensFn = (token: string) => Promise<void>;

export type TGetByLoginResponse = Pick<TPhotographers, 'id' | 'password'>;
export type TTokenUpdateResponse = Pick<TPhotographers, 'id'>;
