import { dataValidate, messageErrorDate } from 'helpers';
import { z } from 'zod';

export type TCreateAlbumData = {
  albumName: string;
  location: string;
  date: string;
};

export const newAlbumDto = z
  .object({
    albumName: z.string(),
    location: z.string(),
    date: z.string(),
  })
  .refine(
    ({ date }) => {
      return dataValidate(date);
    },
    () => ({
      message: messageErrorDate(),
      path: ['date'],
    })
  );
