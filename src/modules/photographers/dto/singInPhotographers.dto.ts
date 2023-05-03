import { z } from 'zod';

export type TSingInPhotographersDto = {
  login: string;
  password: string;
};

const regLogin = {
  reg: /^[a-zA-Z_]+$/,
  message: "Invalid login! Only letters and '_' symbol are allowed.",
};

export const singInPhotographersDto = z.object({
  login: z.string().regex(regLogin.reg, regLogin.message),
  password: z.string(),
});
