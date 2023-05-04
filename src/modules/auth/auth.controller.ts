import { createError } from 'helpers/error/createError';
import { AuthService } from './auth.service';
import { IAuthController, TGetUserByTokenRoutFn, TSingInRoutFn } from './type';

export class AuthController implements IAuthController {
  constructor(private authService: AuthService = new AuthService()) {}

  singIn: TSingInRoutFn = async (req, res) => {
    const userLoginData = req.body;
    const user = await this.authService.singIn(userLoginData);
    return res.json(user);
  };

  getUserByToken: TGetUserByTokenRoutFn = async (req, res) => {
    const user = req.user;
    if (!user) throw createError(500);
    const { id } = user;
    return res.json({ id });
  };
}
