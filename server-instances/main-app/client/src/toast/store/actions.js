import { SHOW_TOAST, HIDE_TOAST } from './types';

export const showToast = (opts) => {
  return (dispatch) => {
    dispatch({ type: SHOW_TOAST, opts });
    return Promise.resolve();
  }
};

export const hideToast = () => {
  return (dispatch) => {
    dispatch({ type: HIDE_TOAST });
    return Promise.resolve();
  }
};
