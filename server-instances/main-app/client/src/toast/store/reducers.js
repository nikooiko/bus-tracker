import { SHOW_TOAST, HIDE_TOAST } from './types';

const INITIAL_STATE = {
  hidden: true,
  timer: null,
  message: '',
  status: 'unknown'
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SHOW_TOAST:
      return { ...state, ...action.opts, hidden: false };
    case HIDE_TOAST:
      return { ...state, hidden: true };
    default:
      return state;
  }
}
