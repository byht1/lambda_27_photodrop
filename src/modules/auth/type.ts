import { TSingInDto } from './dto/singIn.dto'

// CONTROLLER_________
export interface IAuthController {
  readonly breakpointName: string
  singIn: TSingInRoutFn
  getUserByToken: TGetUserByTokenRoutFn
}

export type TSingInRoutFn = TRouterFn<TSingInResponse, TSingInDto>
export type TGetUserByTokenRoutFn = TRouterFn<TGetUserByTokenResponse, void>

export type TSingInResponse = TUserId & TToken
export type TGetUserByTokenResponse = TUserId

type TUserId = { id: string }
type TToken = { token: string }

//SERVICE___________
export interface IAuthService {
  singIn: TSindInFn
}

export type TSindInFn = (userData: TSingInDto) => Promise<TSingInResponse>
