import { TCtrlWrapperFunc } from 'type';

export const ctrlWrapper = <T, B>(ctrl: TRouterFn<T, B>) => {
  const func: TCtrlWrapperFunc = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};
