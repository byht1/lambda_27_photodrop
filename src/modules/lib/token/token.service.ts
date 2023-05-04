import jwt from 'jsonwebtoken';

import { getEnv } from 'helpers';
import { ITokenService, TCreateTokenFn, TDecodeFn, TPayloadToken, TVerifyFn } from './type';

export class TokenService implements ITokenService {
  private tokenKey = getEnv('TOKEN_SECRET_KEY');
  private expTime = '24h';

  createToken: TCreateTokenFn = userId => {
    const payload = { id: userId };
    const token = jwt.sign(payload, this.tokenKey, { expiresIn: this.expTime });
    return token;
  };

  verify: TVerifyFn = token => {
    return jwt.verify(token, this.tokenKey) as TPayloadToken;
  };

  decode: TDecodeFn = token => {
    return jwt.decode(token) as TPayloadToken | null;
  };
}
