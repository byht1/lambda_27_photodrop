import { TMiddlewareFn } from 'type';
import { ZodType, ZodError } from 'zod';

type TField = 'query' | 'params' | 'header' | 'body';

export const validate = (schema: ZodType, field: TField = 'body'): TMiddlewareFn => {
  return async (req, res, next) => {
    try {
      const dataParse = req[field];
      schema.parse(dataParse);
      next();
    } catch (error) {
      const e = (error as ZodError).errors;
      const customError = e.reduce<Record<string, string>>((acc, { message, path }) => {
        const key = path[0];
        acc[key] = message;
        return acc;
      }, {});

      const errorResponse = {
        invalid: field,
        ...customError,
      };

      res.status(400).json(errorResponse);
    }
  };
};
