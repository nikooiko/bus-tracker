import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from './sidebarTypes';

const INITIAL_STATE = {
  opened: false
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case OPEN_SIDEBAR:
      return { ...state, opened: true };
    case CLOSE_SIDEBAR:
      return { ...state, opened: false };
    default:
      return state;
  }
}
