import { OPEN_SIDEBAR, CLOSE_SIDEBAR} from './types';

export const openSidebar = () => {
  return {
    type: OPEN_SIDEBAR
  }
};

export const closeSidebar = () => {
  return {
    type: CLOSE_SIDEBAR
  }
};
