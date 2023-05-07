import PathPhotographersCurrent from './auth/current.json';
import PathPhotographersSingIn from './auth/singIn.json';

import PathAlbums from './albums/albums.json';
import PathAlbumsPhotos from './albums/albumPhotos.json';
import PathAddPerson from './albums/addPerson.json';

export const paths = {
  ...PathPhotographersSingIn,
  ...PathPhotographersCurrent,
  ...PathAlbums,
  ...PathAlbumsPhotos,
  ...PathAddPerson,
};
