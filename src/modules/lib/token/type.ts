export interface ITokenService {
  createToken: TCreateTokenFn;
  verify: TVerifyFn;
  decode: TDecodeFn;
}

export type TCreateTokenFn = (id: string) => string;
export type TVerifyFn = (token: string) => TPayloadToken;
export type TDecodeFn = (token: string) => TPayloadToken | null;

export type TPayloadToken = { id: string };
