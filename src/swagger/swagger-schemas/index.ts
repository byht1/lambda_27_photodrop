import token from './global/token.json';
import photographersUser from './global/photographersUser.json';
import pagination from './global/pagination.json';

import photographersUserCurrentResponse from './response/photographersUserCurrentResponse.json';
import albumCreate from './response/albumCreate.json';
import getAllAlbums from './response/getAllAlbumsResponse.json';
import photos from './response/photos.json';

import authHeader from './headers/authHeader.json';

import paginationQuery from './query/paginationQuery.json';

export const schemas = {
  ...photographersUserCurrentResponse,
  ...photographersUser,
  ...token,
  ...authHeader,
  ...albumCreate,
  ...pagination,
  ...getAllAlbums,
  ...paginationQuery,
  ...photos,
};
