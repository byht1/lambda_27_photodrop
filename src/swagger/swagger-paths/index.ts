import PathPhotographersCurrent from './photographers/current.json';
import PathPhotographersSingIn from './photographers/singIn.json';
import PathPhotographersRefresh from './photographers/refresh.json';
import PathPhotographersLogout from './photographers/logout.json';

export const paths = {
  ...PathPhotographersSingIn,
  ...PathPhotographersCurrent,
  ...PathPhotographersRefresh,
  ...PathPhotographersLogout,
};
