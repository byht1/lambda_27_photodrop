import PathPhotographersCurrent from './auth/current.json';
import PathPhotographersSingIn from './auth/singIn.json';

import PathAlbums from './albums/albums.json';

export const paths = {
  ...PathPhotographersSingIn,
  ...PathPhotographersCurrent,
  ...PathAlbums,
};
