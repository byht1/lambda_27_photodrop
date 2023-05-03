import { photographersGetByIdVerify, photographersTokenUpdate } from 'db/repository';
import { createError } from 'helpers/error/createError';
import { decodeToken } from 'modules/lib';
import { EGenerateTokenType, verifyToken } from 'modules/lib';
import { TMiddlewareFn } from 'type';

export const accessAuth: TMiddlewareFn = async (req, _, next) => {
  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer' || !token) {
    next(createError(403, 'Not authorized'));
  }

  try {
    const { id } = verifyToken(EGenerateTokenType.ACCESS, token);

    const user = await photographersGetByIdVerify(id);
    if (!user?.token) throw createError(403, 'Not authorized');
    req.user = user;
    next();
  } catch (error) {
    next(createError(403, 'Not authorized'));
  }
};

export const refreshAuth: TMiddlewareFn = async (req, _, next) => {
  const { refreshToken }: { refreshToken: string } = req.cookies;
  let isInvalidToken = false;

  try {
    const { id } = verifyToken(EGenerateTokenType.REFRESH, refreshToken);

    const user = await photographersGetByIdVerify(id);
    const tokenComparisonResult = refreshToken === user?.token;
    if (!user || !tokenComparisonResult) {
      isInvalidToken = true;
      throw createError(401, 'Not authorized');
    }
    req.user = user;
    next();
  } catch (error) {
    if (isInvalidToken) {
      const decoded = decodeToken(refreshToken);

      if (decoded) {
        const { id } = decoded;
        await photographersTokenUpdate(id, '');
      }
    }
    next(createError(401, 'Not authorized'));
  }
};
