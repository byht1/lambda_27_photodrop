import { z } from 'zod';

export type TAddPersonDto = {
  photoId: string;
  userId: string;
};

export const addPersonDto = z.object({
  photoId: z.string(),
  userId: z.string(),
});
