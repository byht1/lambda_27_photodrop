import { EGenerateTokenType } from './token.service';

export interface ITokenService {
  generateAccessToken: TGenerateAccessTokenFn;
  generateRefreshToken: TGenerateRefreshTokenFn;
  generatePairTokens: TGeneratePairTokensFn;
  verify: TVerifyFn;
  decode: TDecodeFn;
}

export type TGenerateAccessTokenFn = (...args: [TPayloadToken]) => string;
export type TGenerateRefreshTokenFn = (...args: [TPayloadToken]) => TRefreshToken;
export type TGeneratePairTokensFn = (...args: [string]) => TTokens;
export type TVerifyFn = (...args: [EGenerateTokenType, string]) => TPayloadToken;
export type TDecodeFn = (...args: [string]) => TPayloadToken | null;

export type TTokens = {
  accessToken: string;
  refreshToken: TRefreshToken;
};

export type TRefreshToken = {
  token: string;
  expTime: number;
};

export type TPayloadToken = {
  id: string;
};
