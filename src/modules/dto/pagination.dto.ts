import { z } from 'zod';

export const numberStringValidation = {
  reg: /^\d+$/,
  message: 'Must be a string containing only numbers',
};

export const paginationDto = z.object({
  page: z
    .string()
    .regex(numberStringValidation.reg, { message: numberStringValidation.message })
    .optional(),
  limit: z
    .string()
    .regex(numberStringValidation.reg, { message: numberStringValidation.message })
    .optional(),
});
