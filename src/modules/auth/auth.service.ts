import { PhotographersRepository } from 'db/repository'
import { TokenService } from 'modules/lib'
import { createError } from 'helpers/error/createError'
import { IAuthService, TSindInFn } from './type'

export class AuthService implements IAuthService {
  private photographersModel = new PhotographersRepository()
  private tokenService = new TokenService()

  singIn: TSindInFn = async ({ login, password: passwordLogin }) => {
    try {
      const isUser = await this.photographersModel.getByLogin(login)
      if (!isUser) throw createError(401, 'Photographers does not exist"')

      const { password, id } = isUser
      if (password !== passwordLogin) throw createError(401, 'Invalid password')

      const token = this.tokenService.createToken(id)
      const user = await this.photographersModel.tokenUpdate(id, token)

      return { id: user.id, token }
    } catch (error) {
      console.log('🚀  AuthService  error:', error)
      throw createError(503)
    }
  }
}
