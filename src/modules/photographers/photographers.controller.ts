import { createError } from 'helpers/error/createError';
import { PhotographersService } from './photographers.service';
import {
  IPhotographersController,
  TGetUserByTokenRouterFn,
  TLogoutRouterFn,
  TRefreshRouterFn,
  TSingInRouterFn,
} from './type';

export class PhotographersController implements IPhotographersController {
  constructor(private photographersService: PhotographersService = new PhotographersService()) {}

  singIn: TSingInRouterFn = async (req, res) => {
    const userSingInData = req.body;
    const { userData, refreshToken } = await this.photographersService.singIn(userSingInData);
    const { token, expTime } = refreshToken;

    res.cookie('refreshToken', token, { httpOnly: true, maxAge: expTime });
    return res.json(userData);
  };

  getUserByToken: TGetUserByTokenRouterFn = async (req, res) => {
    const user = req.user;
    if (!user) throw createError(500);
    const { firstName, lastName, email, createdAt, id } = user;
    const userData = { firstName, lastName, email, createdAt, id };
    return res.json(userData);
  };

  refresh: TRefreshRouterFn = async (req, res) => {
    const user = req.user;
    if (!user) throw createError(500);
    const accessToken = this.photographersService.refresh(user.id);
    return res.json(accessToken);
  };

  logout: TLogoutRouterFn = async (req, res) => {
    const user = req.user;
    if (!user) throw createError(500);
    await this.photographersService.logout(user.id);
    res.clearCookie('refreshToken');
    return res.status(204).send();
  };
}
