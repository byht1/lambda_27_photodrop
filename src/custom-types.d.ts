import { TPhotographers } from 'db/schema';
import { Request, Response, NextFunction } from 'express';

declare global {
  /**
   * Тип `Req` визначає тип об'єкту запиту від клієнта.
   * Він є розширенням типу `Request` з пакету `express`.
   *
   * @template Params - тип параметрів запиту
   * @template Body - тип тіла запиту
   * @template Query - тип query параметрів запиту
   */
  interface Req<Params = void, Body = any, Query = any> extends Request<Params, any, Body, Query> {
    user?: TPhotographers;
  }
  /**
   * Тип `Res` визначає тип об'єкту відповіді.
   * Він є розширенням типу `Response` з пакету `express`.
   *
   * @template D - тип тіла відповіді
   */
  type Res<D> = Response<D>;
  type Next = NextFunction;
  /**
   * Тип `TRouterFn` визначає тип обробника маршруту для фреймворку Express.
   * Він приймає об'єкт запиту, об'єкт відповіді та опціональний параметр `next`.
   *
   * @template D - тип даних, які повертає обробник
   * @template B - тип тіла запиту
   * @template P - тип параметрів запиту
   * @template Q - тип query параметрів запиту
   */
  type TRouterFn<D, B, P = void, Q = void> = (
    req: Req<P, B, Q>,
    res: Res<D>,
    next?: Next
  ) => Promise<Res<D>>;
}
