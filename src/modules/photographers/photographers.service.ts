import { PhotographersRepository } from 'db/repository';
import { TokenService } from 'modules/lib';
import { createError } from 'helpers/error/createError';
import {
  IPhotographersService,
  TLogoutServiceFn,
  TRefreshServiceFn,
  TSingInServiceFn,
} from './type';

export class PhotographersService implements IPhotographersService {
  constructor(
    private photographersModel: PhotographersRepository = new PhotographersRepository(),
    private tokenService: TokenService = new TokenService()
  ) {}

  singIn: TSingInServiceFn = async ({ login, password: passwordLogin }) => {
    try {
      const isUser = await this.photographersModel.getByLogin(login);
      if (!isUser) throw createError(401, 'Photographers does not exist"');

      const { password, id } = isUser;
      if (password !== passwordLogin) throw createError(401, 'Invalid password');

      const { accessToken, refreshToken } = this.tokenService.generatePairTokens(id);
      const user = await this.photographersModel.tokenUpdate(id, refreshToken.token);

      return { userData: { ...user, accessToken }, refreshToken };
    } catch (error) {
      throw createError(503);
    }
  };

  refresh: TRefreshServiceFn = userId => {
    const accessToken = this.tokenService.generateAccessToken({ id: userId });

    return { accessToken };
  };

  logout: TLogoutServiceFn = async userId => {
    try {
      await this.photographersModel.tokenUpdate(userId, '');
    } catch (error) {
      throw createError(503);
    }
  };
}
