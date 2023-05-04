import { TableAlbums } from 'db/schema';

export type TTable<T> = T extends TableAlbums ? T : never;

type TMaxPage = { maxPage: number };
export type TPaginationResponse<K extends string, D> = TMaxPage & {
  [key in K]: D[];
};
