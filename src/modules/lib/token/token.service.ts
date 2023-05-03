import jwt from 'jsonwebtoken';

import { getEnv } from 'helpers';
import {
  ITokenService,
  TDecodeFn,
  TGenerateAccessTokenFn,
  TGeneratePairTokensFn,
  TGenerateRefreshTokenFn,
  TPayloadToken,
  TVerifyFn,
} from './type';

export const enum EGenerateTokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export class TokenService implements ITokenService {
  private keyAccess = getEnv('ACCESS_SECRET_KEY');
  private keyRefresh = getEnv('REFRESH_SECRET_KEY');
  private accessExpTime = '15m';
  private refreshExpTime = '24h';

  generateAccessToken: TGenerateAccessTokenFn = payload => {
    return jwt.sign(payload, this.keyAccess, { expiresIn: this.accessExpTime });
  };

  generateRefreshToken: TGenerateRefreshTokenFn = payload => {
    const expTime = this.calcRefreshExpTimeToMs();
    const token = jwt.sign(payload, this.keyRefresh, { expiresIn: this.refreshExpTime });
    return { token, expTime };
  };

  generatePairTokens: TGeneratePairTokensFn = userId => {
    const payload = { id: userId };
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return { accessToken, refreshToken };
  };

  verify: TVerifyFn = (typeToken, token) => {
    const key = this.getTokenKeyType(typeToken);
    const payload = jwt.verify(token, key) as TPayloadToken;

    return payload;
  };

  decode: TDecodeFn = token => {
    return jwt.decode(token) as TPayloadToken | null;
  };

  private getTokenKeyType = (typeToken: EGenerateTokenType) => {
    return typeToken === EGenerateTokenType.ACCESS ? this.keyAccess : this.keyRefresh;
  };

  private calcRefreshExpTimeToMs = () => {
    const MINUTES_MS = 60_000;
    const HOURS_MS = MINUTES_MS * 60;
    const hours = Number.parseInt(this.refreshExpTime);

    return hours * HOURS_MS;
  };
}

export const { verify: verifyToken, decode: decodeToken } = new TokenService();
