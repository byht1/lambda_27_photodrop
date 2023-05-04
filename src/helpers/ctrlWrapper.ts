import { TCtrlWrapperFunc } from 'type';

export const ctrlWrapper = <D, B, P, Q>(ctrl: TRouterFn<D, B, P, Q>) => {
  const func: TCtrlWrapperFunc<D, B, P, Q> = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};
