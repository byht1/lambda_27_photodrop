import { TTokenUpdateResponse } from 'db/repository';
import { TSingInPhotographersDto } from './dto/singInPhotographers.dto';
import { TRefreshToken } from 'modules/lib/token/type';

// CONTROLLER_____________
export interface IPhotographersController {
  singIn: TSingInRouterFn;
  getUserByToken: TGetUserByTokenRouterFn;
  refresh: TRefreshRouterFn;
  logout: TLogoutRouterFn;
}

export type TSingInRouterFn = TRouterFn<TPhotographersData, TSingInPhotographersDto>;
export type TGetUserByTokenRouterFn = TRouterFn<TTokenUpdateResponse, void>;
export type TRefreshRouterFn = TRouterFn<TAccessToken, void>;
export type TLogoutRouterFn = TRouterFn<void, void>;

export type TAccessToken = { accessToken: string };
export type TPhotographersData = TTokenUpdateResponse & TAccessToken;

// SERVICE__________
export interface IPhotographersService {
  singIn: TSingInServiceFn;
  refresh: TRefreshServiceFn;
  logout: TLogoutServiceFn;
}

export type TSingInServiceFn = (
  ...args: [TSingInPhotographersDto]
) => Promise<TSingInServiceResponse>;
export type TRefreshServiceFn = (...args: [string]) => TAccessToken;
export type TLogoutServiceFn = (...args: [string]) => void;

export type TSingInServiceResponse = {
  userData: TPhotographersData;
  refreshToken: TRefreshToken;
};
