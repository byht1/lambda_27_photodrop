import PathPhotographersCurrent from './auth/current.json';
import PathPhotographersSingIn from './auth/singIn.json';

import PathAlbums from './albums/albums.json';
// import PathGetAllAlbums from './albums/getAllAlbums.json';

export const paths = {
  ...PathPhotographersSingIn,
  ...PathPhotographersCurrent,
  ...PathAlbums,
  // ...PathGetAllAlbums,
};
