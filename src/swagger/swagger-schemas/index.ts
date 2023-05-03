import accessToken from './global/accessToken.json';
import photographersUser from './global/photographersUser.json';

import photographersUserCurrentResponse from './response/photographersUserCurrentResponse.json';

import authHeader from './headers/authHeader.json';

export const schemas = {
  ...photographersUserCurrentResponse,
  ...photographersUser,
  ...accessToken,
  ...authHeader,
};
