import { TPhotographers } from 'db/schema';

export interface IPhotographersRepository {
  getByLogin: TGetByLoginFn;
  tokenUpdate: TTokenUpdateFn;
  getById: TGetByIdFn;
  getByIdVerify: TGetByIdVerifyFn;
}

export type TGetByLoginFn = (...args: [string]) => Promise<TGetByLoginResponse | undefined>;
export type TTokenUpdateFn = (...args: [string, string]) => Promise<TTokenUpdateResponse>;
export type TGetByIdFn = (id: string) => Promise<TGetByIdResponse>;
export type TGetByIdVerifyFn = (id: string) => Promise<TPhotographers | undefined>;

export type TGetByLoginResponse = Pick<TPhotographers, 'id' | 'password' | 'login'>;
export type TGetByIdResponse = Omit<TPhotographers, 'password' | 'login' | 'token'>;
export type TTokenUpdateResponse = Pick<
  TPhotographers,
  'email' | 'createdAt' | 'firstName' | 'lastName' | 'id'
>;
